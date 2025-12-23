import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Header() {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center my-20 px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 text-stone-600 bg-white px-6 py-1 rounded-full border border-neutral-400 shadow-sm"
      >
        <p className="text-sm sm:text-base">Where words become visuals</p>
        <img src={assets.star_icon} alt="highlight" />
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-10 text-4xl sm:text-7xl max-w-[320px] sm:max-w-[600px] font-semibold leading-tight"
      >
        Turn words into{" "}
        <motion.span
          className="text-blue-600 inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          stunning images
        </motion.span>{" "}
        in seconds
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-5 max-w-xl text-neutral-600 text-base sm:text-lg"
      >
        Bring your ideas to life with AI-powered image generation. Simply
        describe what you imagine, and watch it transform into visual art
        instantly.
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        variants={item}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 flex items-center gap-2 rounded-full bg-black px-12 py-3
                   text-white text-base sm:text-lg cursor-pointer
                   transition-all duration-300 ease-out
                   hover:shadow-xl"
      >
        Generate Images
        <img src={assets.star_group} alt="generate" className="h-6" />
      </motion.button>

      <motion.div
        className="mt-16 flex flex-wrap justify-center gap-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {[
          assets.sample_img_2,
          assets.sample_img_3,
          assets.sample_img_4,
          assets.sample_img_5,
          assets.sample_img_6,
          assets.sample_img_7,
        ].map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`AI generated sample ${index + 2}`}
            variants={item}
            whileHover={{
              scale: 1.08,
              y: -4,
              transition: { duration: 0.2 },
            }}
            className="w-14 sm:w-[70px] rounded cursor-pointer shadow-sm hover:shadow-md"
          />
        ))}
      </motion.div>

      <motion.p variants={item} className="mt-3 text-sm text-neutral-500">
        Images generated using Imaginex
      </motion.p>
    </motion.div>
  );
}

export default Header;
