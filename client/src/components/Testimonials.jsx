import { assets, testimonialsData } from "../assets/assets";

function Testimonials() {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What our users are saying</p>

      <div className="flex flex-wrap gap-6 justify-center">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="w-80 rounded-xl bg-white/20 p-10 shadow-lg cursor-pointer
                       transition-all duration-300 ease-out
                       hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.03]"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-3"
              />

              <h2 className="text-xl font-semibold">{testimonial.name}</h2>

              <p className="text-gray-500 mb-4">{testimonial.role}</p>

              <div className="flex mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="rating" />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
