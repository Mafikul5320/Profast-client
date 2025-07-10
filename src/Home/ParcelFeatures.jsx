import React from 'react';
import image1 from '../assets/other/live-tracking.png'
import image2 from '../assets/other/big-deliveryman.png'
import image3 from '../assets/other/safe-delivery.png'

const features = [
    {
        image: image1, 
        title: 'Live Parcel Tracking',
        description:
            'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
    },
    {
        image: image2,
        title: '100% Safe Delivery',
        description:
            'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    },
    {
        image: image3,
        title: '24/7 Call Center Support',
        description:
            'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    },
];

const Features = () => {
    return (
        <div className="py-10 w-10/13 mx-auto space-y-6 border-b-1 border-teal-800 border-dashed my-9">
            {features.map((feature, idx) => (
                <div
                    key={idx}
                    className="flex bg-white rounded-xl p-6 gap-6 shadow-sm items-center"
                >
                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-28 h-28 border-r pr-7 border-teal-800 border-dashed object-contain"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-teal-800 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 max-w-xl">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Features;
