import React from "react";

type Testimonial = {
  name: string;
  message: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jane Doe",
    message: "This store has amazing service and high-quality products. Highly recommended!",
    role: "Customer",
  },
  {
    name: "John Smith",
    message: "Fast delivery and responsive support. Will definitely buy again.",
    role: "Repeat Buyer",
  },
  {
    name: "Emily Rose",
    message: "I loved the variety and the interface was very user-friendly!",
    role: "First-time Visitor",
  },
];

const Testimony = () => {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-2 text-gray-600">Real feedback from our valued customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-700 italic">“{t.message}”</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimony;
