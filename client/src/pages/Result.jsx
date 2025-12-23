import { useState } from "react";
import { assets } from "../assets/assets";

function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageloaded, setisImageloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {};

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] items-center justify-center px-4"
    >
      <div className="flex flex-col items-center">
        <div className="relative bg-neutral-100 rounded-xl shadow-lg p-4">
          <img
            src={image}
            alt="Generated result"
            className="max-w-sm w-full rounded-lg object-cover"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 rounded-b-lg ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>

        {loading && (
          <p className="mt-3 text-sm text-gray-500 animate-pulse">
            Generating your image...
          </p>
        )}
      </div>

      {!isImageloaded && (
        <div className="flex w-full max-w-xl bg-neutral-800 text-white text-sm mt-12 rounded-full overflow-hidden shadow-md">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent px-6 py-4 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-black px-8 sm:px-14 py-3 cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            Generate
          </button>
        </div>
      )}

      {isImageloaded && (
        <div className="flex gap-4 flex-wrap justify-center mt-12">
          <button
            type="button"
            onClick={() => setisImageloaded(false)}
            className="border border-zinc-900 text-zinc-900 px-8 py-3 rounded-full cursor-pointer hover:bg-zinc-900 hover:text-white transition"
          >
            Generate Another
          </button>

          <a
            href={image}
            download
            className="bg-zinc-900 text-white px-10 py-3 rounded-full hover:bg-black transition cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
}

export default Result;
