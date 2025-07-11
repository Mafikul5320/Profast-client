import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { User } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: history = [] } = useQuery({
        queryKey: ['payment', User?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${User?.email}`)
            return res.data;
        }
    })
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Parcel ID</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Paid At</th>
                        <th className="px-6 py-3">Transaction ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {history?.map((item, index) => (
                        <tr key={item._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium">{index + 1}</td>
                            <td className="px-6 py-4 text-blue-600">{item.parcelId}</td>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4 text-green-600 font-semibold">
                                ${(item.amount / 100).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">{new Date(item.paid_at).toLocaleString()}</td>
                            <td className="px-6 py-4 text-gray-500 text-sm">{item.transaction_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;