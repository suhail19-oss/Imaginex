import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactiondataModel from "../models/transactiondataModel.js";
import { SchemaTypeOptions } from "mongoose";
import crypto from "crypto";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include a number and a special character",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("name creditBalance");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let credits, plan, amount;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 199;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 499;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 1999;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Plan not found",
        });
    }

    const transaction = await transactiondataModel.create({
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    });

    const order = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: transaction._id.toString(),
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    const transactionData = await transactiondataModel.findById(
      orderInfo.receipt
    );

    if (!transactionData) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transactionData.payment) {
      return res.status(400).json({
        success: false,
        message: "Payment already processed",
      });
    }

    const userData = await userModel.findById(transactionData.userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await userModel.findByIdAndUpdate(userData._id, {
      $inc: { creditBalance: transactionData.credits },
    });

    await transactiondataModel.findByIdAndUpdate(transactionData._id, {
      payment: true,
    });

    return res.status(200).json({
      success: true,
      message: "Credits added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
