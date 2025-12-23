import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function Description() {
  return (
    <motion.div
      className="my-24 px-6 md:px-28"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        className="flex flex-col items-center text-center mb-14"
        variants={item}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold">Create AI images</h1>
        <p className="mt-3 text-gray-500 max-w-xl">
          Turn your imagination into visuals with ease.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        variants={container}
      >
        <motion.img
          src={assets.sample_img_8}
          alt="AI generated sample"
          className="w-80 xl:w-80 rounded-xl shadow-lg"
          variants={item}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div className="max-w-xl" variants={container}>
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold mb-4"
            variants={item}
          >
            AI-powered text-to-image generation
          </motion.h2>

          <motion.p
            className="text-neutral-600 leading-relaxed mb-4"
            variants={item}
          >
            Imaginex allows you to convert simple text prompts into
            high-quality, AI-generated images within seconds. Whether you are
            visualizing a creative concept, designing artwork, or exploring new
            ideas, our advanced AI handles the complexity for you.
          </motion.p>

          <motion.p
            className="text-neutral-600 leading-relaxed mb-4"
            variants={item}
          >
            Just describe what you imagine in words, and Imaginex interprets
            your prompt to generate detailed visuals with impressive accuracy.
            From realistic scenes and portraits to abstract art and imaginative
            designs, the possibilities are virtually endless.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Description;
