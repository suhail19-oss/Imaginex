import { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

function Navbar() {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={assets.logo_icon}
          alt="Imaginex logo"
          className="w-8 sm:w-10"
        />
        <span className="text-xl sm:text-2xl font-semibold tracking-tight">
          imaginex
        </span>
      </Link>

      {user ? (
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img className="w-5" src={assets.credit_star} alt="" />
            <p className="text-xs sm:text-sm font-medium text-gray-700">
              Credits left: {credit}
            </p>
          </button>

          <p className="text-gray-600 hidden sm:block">Hi, {user.name}</p>

          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 drop-shadow cursor-pointer"
              alt=""
            />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12">
              <ul className="bg-white rounded-md text-sm shadow-md px-1 py-1 border-2 border-black">
                <li
                  onClick={logout}
                  tabIndex={-1}
                  className="px-4 py-2 text-sm font-medium text-black cursor-pointer
                 hover:underline underline-offset-4
                 hover:bg-gray-50
                 rounded
                 focus:outline-none focus:ring-0
                 transition-all duration-200"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <p
            onClick={() => navigate("/buy")}
            className="text-gray-700 cursor-pointer underline-offset-4 hover:underline transition"
          >
            Pricing
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-zinc-800 text-white px-7 py-2 sm:px-6 text-sm rounded-full cursor-pointer hover:bg-zinc-900 transition"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
