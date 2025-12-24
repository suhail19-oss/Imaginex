import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageloaded, setisImageloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);

    const result = await generateImage(input);

    setLoading(false);

    if (!result.success && result.creditBalance === 0) {
      navigate("/buy", { replace: true });
      return;
    }

    if (result.success) {
      setisImageloaded(true);
      setImage(result.image);
      toast.success("Image generated successfully");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] items-center justify-center px-4"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={image}
            className="relative bg-white p-4 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={image}
              alt="Generated result"
              className="max-w-sm w-full rounded-xl object-cover"
              initial={{ scale: 1.05, filter: "brightness(0.7)" }}
              animate={{ scale: 1, filter: "brightness(1)" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {loading && (
              <motion.div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b
                 from-white/10 via-white/25 to-white/10"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.p
            className="mt-4 text-xs tracking-widest text-gray-500 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            Scanning prompt data
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isImageloaded && (
          <motion.div
            className="mt-12 flex w-full max-w-xl bg-neutral-800 text-white rounded-full overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Describe what you want to generate"
              className="flex-1 bg-transparent px-6 py-4 outline-none placeholder-gray-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black px-10 py-3 cursor-pointer hover:bg-zinc-800"
            >
              Generate
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isImageloaded && (
          <motion.div
            className="mt-12 flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <motion.button
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setisImageloaded(false)}
              className="px-8 py-3 rounded-full border border-zinc-900 text-zinc-900 hover:bg-zinc-900 cursor-pointer hover:text-white transition"
            >
              Generate Another
            </motion.button>

            <motion.a
              href={image}
              download
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-3 rounded-full bg-zinc-900 text-white hover:bg-black transition"
            >
              Download
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default Result;
