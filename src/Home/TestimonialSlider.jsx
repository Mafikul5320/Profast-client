import React, { useState } from 'react';

const testimonials = [
  {
    name: "Rasel Ahamed",
    title: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    title: "CEO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nusrat Jahan",
    title: "Marketing Head",
    text: "Using this product has helped me sit straighter and feel better throughout my workday.",
  },
  {
    name: "Tanvir Islam",
    title: "UX Designer",
    text: "I love the design and comfort. Really helps with my back pain!",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#f5f8fa] py-16 px-4 text-center overflow-hidden">
      <h2 className="text-3xl font-bold text-teal-900">What our customers are sayings</h2>
      <p className="text-gray-600 mt-4 max-w-xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
      </p>

      <div className="relative flex items-center justify-center mt-10">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-white p-2 rounded-full shadow text-teal-700 hover:bg-teal-50 z-10"
        >
          ←
        </button>

        {/* Slider */}
        <div className="flex gap-4 transition-transform duration-500 ease-in-out">
          {testimonials.map((t, index) => {
            const position = index - current;

            let classes =
              "bg-white p-6 rounded-xl shadow-md w-72 transition-all duration-500";
            if (position === 0) {
              classes += " scale-100 opacity-100 z-20";
            } else if (position === -1 || position === 1) {
              classes += " scale-90 opacity-50 z-10 hidden sm:block";
            } else {
              classes += " scale-90 opacity-0 hidden";
            }

            return (
              <div key={index} className={classes}>
                <div className="text-4xl text-teal-500 mb-4">“</div>
                <p className="text-sm text-gray-600 mb-6">{t.text}</p>
                <hr className="border-dotted border-t-2 border-gray-300 w-2/3 mx-auto mb-4" />
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-bold text-gray-700">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 bg-lime-300 p-2 rounded-full text-white hover:bg-lime-400 z-10"
        >
          →
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-teal-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
