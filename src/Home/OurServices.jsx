import React from 'react';

const services = [
  {
    title: 'Express & Standard Delivery',
    desc: 'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    bg: 'bg-white',
  },
  {
    title: 'Nationwide Delivery',
    desc: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    bg: 'bg-white',
  },
  {
    title: 'Fulfillment Solution',
    desc: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    bg: 'bg-white',
  },
  {
    title: 'Cash on Home Delivery',
    desc: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    bg: 'bg-white',
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    desc: 'Customized corporate services which includes warehouse and inventory management support.',
    bg: 'bg-white',
  },
  {
    title: 'Parcel Return',
    desc: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    bg: 'bg-white',
  },
];

const OurServices = () => {
  return (
    <section className="bg-teal-900 py-14 px-4">
      <div className="max-w-7xl mx-auto text-center text-white ">
        <h2 className="text-3xl font-semibold mb-3">Our Services</h2>
        <p className="max-w-3xl mx-auto mb-10 text-sm text-gray-200">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bg} rounded-2xl p-6 text-gray-800 shadow-sm hover:bg-lime-200`}
            >
              <div className="flex items-center justify-center mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/7605/7605230.png" alt="icon" className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-teal-900 text-center">{service.title}</h3>
              <p className="text-sm text-gray-600 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
