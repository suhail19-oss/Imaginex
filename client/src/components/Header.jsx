import { assets } from "../assets/assets";

function Header() {
  return (
    <div className="flex flex-col items-center text-center my-20 px-4">
      <div className="inline-flex items-center gap-2 text-stone-600 bg-white px-6 py-1 rounded-full border border-neutral-400">
        <p className="text-sm sm:text-base">Where words become visuals</p>

        <img src={assets.star_icon} alt="highlight" />
      </div>

      <h1 className="mt-10 text-4xl sm:text-7xl max-w-[320px] sm:max-w-[600px] font-semibold leading-tight">
        Turn words into <span className="text-blue-600">stunning images</span>{" "}
        in seconds
      </h1>

      <p className="mt-5 max-w-xl text-neutral-600 text-base sm:text-lg">
        Bring your ideas to life with AI-powered image generation. Simply
        describe what you imagine, and watch it transform into visual art
        instantly.
      </p>

      <button
        className="mt-8 flex items-center gap-2 rounded-full bg-black px-12 py-3
             text-white text-base sm:text-lg cursor-pointer
             transition-all duration-300 ease-out
             hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
      >
        Generate Images
        <img src={assets.star_group} alt="generate" className="h-6" />
      </button>

      <div className="mt-16 flex flex-wrap justify-center gap-3">
        {[
          assets.sample_img_2,
          assets.sample_img_3,
          assets.sample_img_4,
          assets.sample_img_5,
          assets.sample_img_6,
          assets.sample_img_7,
        ].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`AI generated sample ${index + 2}`}
            className="w-14 sm:w-[70px] rounded cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Images generated using Imaginex
      </p>
    </div>
  );
}

export default Header;
