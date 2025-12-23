import { assets } from "../assets/assets";

function Description() {
  return (
    <div className="my-24 px-6 md:px-28">
      <div className="flex flex-col items-center text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Create AI images</h1>
        <p className="mt-3 text-gray-500 max-w-xl">
          Turn your imagination into visuals with ease.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <img
          src={assets.sample_img_8}
          alt="AI generated sample"
          className="w-80 xl:w-80 rounded-xl shadow-lg"
        />

        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            AI-powered text-to-image generation
          </h2>

          <p className="text-neutral-600 leading-relaxed mb-4">
            Imaginex allows you to convert simple text prompts into
            high-quality, AI-generated images within seconds. Whether you are
            visualizing a creative concept, designing artwork, or exploring new
            ideas, our advanced AI handles the complexity for you.
          </p>

          <p className="text-neutral-600 leading-relaxed mb-4">
            Just describe what you imagine in words, and Imaginex interprets
            your prompt to generate detailed visuals with impressive accuracy.
            From realistic scenes and portraits to abstract art and imaginative
            designs, the possibilities are virtually endless.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
