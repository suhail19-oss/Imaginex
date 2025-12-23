import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function BuyCredit() {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 px-4">
      <button className="px-10 py-2 rounded-full mb-6 cursor-pointer bg-gradient-to-r from-gray-900 to-gray-700 text-white tracking-wide hover:opacity-90 transition outline-none focus:outline-none">
        Our Plans
      </button>

      <h1 className="text-3xl font-medium mb-10">Choose the Plan</h1>

      <div className="flex flex-wrap justify-center gap-8 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl py-12 px-8 text-gray-600 w-72 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 hover:opacity-100 transition" />

            <img src={assets.logo_icon} alt="" className="w-10 relative z-10" />

            <p className="mt-4 mb-1 font-semibold text-lg text-gray-800 relative z-10">
              {item.id}
            </p>

            <p className="text-sm text-gray-500 relative z-10">{item.desc}</p>

            <p className="mt-6 text-gray-800 relative z-10">
              <span className="text-3xl font-semibold">${item.price}</span>
              <span className="text-sm text-gray-500">
                {" "}
                / {item.credits} credits
              </span>
            </p>

            <button className="w-full mt-8 py-3 rounded-full text-sm cursor-pointer bg-black text-white hover:scale-[1.03] active:scale-95 transition-transform outline-none focus:outline-none relative z-10">
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyCredit;
