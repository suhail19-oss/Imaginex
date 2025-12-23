import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const headerFade = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const list = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function BuyCredit() {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 px-4">
      <motion.button
        variants={headerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="px-10 py-2 rounded-full mb-6 cursor-pointer
                   bg-gradient-to-r from-gray-900 to-gray-700
                   text-white tracking-wide hover:opacity-90 transition
                   outline-none focus:outline-none"
      >
        Our Plans
      </motion.button>

      <motion.h1
        variants={headerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-medium mb-10"
      >
        Choose the Plan
      </motion.h1>

      <motion.div
        className="flex flex-wrap justify-center gap-8 text-left"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {plans.map((item, index) => (
          <motion.div
            key={index}
            variants={card}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="bg-white rounded-2xl py-12 px-8 text-gray-600 w-72
                       shadow-md hover:shadow-2xl relative overflow-hidden"
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

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full mt-8 py-3 rounded-full text-sm cursor-pointer
                         bg-black text-white transition-transform
                         outline-none focus:outline-none relative z-10"
            >
              {user ? "Purchase" : "Get Started"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default BuyCredit;
