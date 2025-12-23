import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Login() {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
      <form className="relative w-full max-w-md bg-white rounded-3xl px-10 py-12 shadow-2xl text-slate-600">
        <h1 className="text-center text-3xl font-semibold text-neutral-800">
          {state}
        </h1>

        <p className="text-center text-sm text-gray-500 mt-2">
          Welcome back! Please continue
        </p>

        {state !== "Login" && (
          <div className="mt-8 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-5 h-5 opacity-60"
            />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full">
          <img src={assets.email_icon} alt="" className="w-5 h-5 opacity-60" />
          <input
            type="email"
            placeholder="Email address"
            required
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="mt-5 flex items-center gap-4 bg-gray-100 px-6 py-4 rounded-full">
          <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-60" />
          <input
            type="password"
            placeholder="Password"
            required
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 text-right cursor-pointer hover:underline">
            Forgot password?
          </p>
        )}

        <button className="w-full mt-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg cursor-pointer hover:opacity-90 active:scale-95 transition">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          onClick={() => setShowLogin(false)}
          className="absolute top-6 right-6 w-4 cursor-pointer opacity-70 hover:opacity-100"
        />
      </form>
    </div>
  );
}

export default Login;
