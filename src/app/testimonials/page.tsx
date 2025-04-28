import React from "react";

const testimonials = [
  {
    name: "Jeck Doe",
    title: "Founder of Name",
    feedback:
      "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
  },
  {
    name: "Mark Basten",
    title: "Founder of Games",
    feedback:
      "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
  },
  {
    name: "Sahib Kadi",
    title: "Founder of Monolit",
    feedback:
      "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12">What our client say</h2>
      <div className="max-w-6xl mx-auto bg-blue-100 rounded-xl p-10 grid gap-8 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4 justify-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{item.title}</p>
            <p className="text-gray-700 text-sm">{item.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
