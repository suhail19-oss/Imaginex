import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function GenerateBtn() {
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
      className="pb-16 text-center px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        See the magic. Try now.
      </motion.h1>

      <motion.button
        onClick={onClickHandler}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full
                   bg-black text-white cursor-pointer
                   shadow-lg hover:shadow-2xl"
      >
        Generate Images
        <motion.img
          src={assets.star_group}
          alt=""
          className="h-6"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.button>
    </motion.div>
  );
}

export default GenerateBtn;
