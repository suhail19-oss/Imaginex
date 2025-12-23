import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default userAuth;
