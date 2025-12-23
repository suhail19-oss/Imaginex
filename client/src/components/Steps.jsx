import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Steps() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-32 px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.h1
        variants={item}
        className="text-3xl sm:text-4xl font-semibold mb-2 text-center"
      >
        How Imaginex works
      </motion.h1>

      <motion.p
        variants={item}
        className="text-neutral-600 mb-12 text-center max-w-xl"
      >
        Create AI-generated images in a simple, seamless flow.
      </motion.p>

      <motion.div className="w-full max-w-3xl space-y-6" variants={container}>
        {stepsData.map((itemData, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-xl
                       bg-gradient-to-br from-white/60 to-white/40
                       p-6 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-12 w-12 items-center justify-center
                           rounded-lg bg-blue-100"
              >
                <img src={itemData.icon} alt={itemData.title} className="w-6" />
              </motion.div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1">
                  {itemData.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {itemData.description}
                </p>
              </div>
            </div>

            <span
              className="pointer-events-none absolute inset-0
                             bg-gradient-to-r from-transparent via-white/30 to-transparent
                             opacity-0 group-hover:opacity-100 transition duration-500"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Steps;
