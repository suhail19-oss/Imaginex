import { stepsData } from "../assets/assets";

function Steps() {
  return (
    <div className="flex flex-col items-center justify-center my-32 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        How Imaginex works
      </h1>
      <p className="text-neutral-600 mb-10 text-center">
        Create AI-generated images in a simple, seamless flow.
      </p>

      <div className="w-full max-w-3xl space-y-6">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <img src={item.icon} alt={item.title} className="w-6" />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1">
                  {item.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Steps;
