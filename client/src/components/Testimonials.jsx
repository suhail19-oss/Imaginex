import { assets, testimonialsData } from "../assets/assets";
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

function Testimonials() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12 px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.h1 variants={item} className="text-3xl sm:text-4xl font-semibold">
        Customer Testimonials
      </motion.h1>

      <motion.p variants={item} className="text-gray-500 mb-12">
        What our users are saying
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-6 justify-center"
        variants={container}
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-80 rounded-xl bg-white/20 p-10 shadow-lg cursor-pointer
                       hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />

              <h2 className="text-xl font-semibold">{testimonial.name}</h2>

              <p className="text-gray-500 mb-4">{testimonial.role}</p>

              <motion.div
                className="flex mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="rating" />
                ))}
              </motion.div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Testimonials;
