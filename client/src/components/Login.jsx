import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Login() {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const isLogin = state === "Login";
      const url = isLogin ? "/api/user/login" : "/api/user/register";

      const payload = isLogin ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendURL + url, payload);

      if (!data.success) {
        return toast.error(data.message);
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      toast.success(
        isLogin ? "Logged in successfully" : "Account created successfully"
      );

      setShowLogin(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={onSubmitHandler}
          layout
          className="relative w-full max-w-md bg-white rounded-3xl px-10 py-12 shadow-2xl text-slate-600"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.h1
            variants={item}
            className="text-center text-3xl font-semibold text-neutral-800"
          >
            {state}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-center text-sm text-gray-500 mt-2"
          >
            Welcome back! Please continue
          </motion.p>

          <AnimatePresence mode="wait">
            {state !== "Login" && (
              <motion.div
                key="name"
                layout
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-8 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full"
              >
                <img
                  src={assets.profile_icon}
                  alt=""
                  className="w-6 h-6 opacity-60"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full"
          >
            <img
              src={assets.email_icon}
              alt=""
              className="w-5 h-5 opacity-60"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email address"
              required
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full"
          >
            <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-60" />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-gray-500 text-sm select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </motion.div>

          <AnimatePresence>
            {state === "Login" && (
              <motion.p
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="text-sm text-blue-600 mt-4 text-right cursor-pointer hover:underline"
              >
                Forgot password?
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg cursor-pointer hover:opacity-90 transition"
          >
            {state === "Login" ? "Login" : "Create Account"}
          </motion.button>

          <motion.p
            variants={item}
            className="mt-6 text-center text-sm text-gray-600"
          >
            {state === "Login" ? (
              <>
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setState("Sign Up")}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setState("Login")}
                >
                  Login
                </span>
              </>
            )}
          </motion.p>

          <motion.img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
            whileHover={{ rotate: 90 }}
            className="absolute top-6 right-6 w-4 cursor-pointer opacity-70 hover:opacity-100"
          />
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

export default Login;
