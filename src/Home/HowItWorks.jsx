import React from 'react';
import { PackageCheck } from 'lucide-react'; // Using lucide-react icons

const HowItWorks = () => {
  const steps = [
    {
      title: 'Booking Pick & Drop',
      desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      title: 'Cash On Delivery',
      desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      title: 'Delivery Hub',
      desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      title: 'Booking SME & Corporate',
      desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm p-6 text-left">
              <PackageCheck className="text-teal-800 w-10 h-10 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
