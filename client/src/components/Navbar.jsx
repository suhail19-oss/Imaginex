import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  return (
    <div className="flex items-center gap-1">
      <Link to={"/"}>
        <img
          src={assets.logo_icon}
          alt="Imaginex logo"
          className="w-8 sm:w-10 lg:w-10 mt-6"
        />
      </Link>

      <span className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-5">
        imaginex
      </span>
      <div>{user ? <div></div> : <div></div>}</div>
    </div>
  );
}

export default Navbar;
