import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const PaymentFrom = () => {
    const stripe = useStripe();
    const element = useElements();
    const [error, setError] = useState();
    const axiosSecure = useAxiosSecure();
    const { id: parcelId } = useParams();
    const { User } = useAuth()
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    // console.log("stripe", stripe);
    // console.log("element", element);
    const { data: parcelInfo = {} } = useQuery({
        queryKey: ['parsel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parsels/${parcelId}`);
            return res.data
        }

    })
    const amountcents = parcelInfo.cost * 100;

    // console.log(parcelInfo)
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !element) {
            return;
        };
        const card = element.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
            console.log('[error]', error);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
        const res = await axiosSecure.post('/create-payment-intent', {
            amountcents,
            parcelId
        });
        console.log(res);
        const clientSecret = res.data.clientSecret;


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: User?.displayName,
                    email: User?.email
                }
            },
        });
        console.log(result)
        if (result.error) {
            setError(error.message);
            setProcessing(false);
        }
        else {
            setSuccess(`Payment successful! ID: `);
            setError('');
            setProcessing(false);
        }

    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <form onSubmit={handelSubmit} className="space-y-6">
                <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#374151', // Tailwind gray-700
                                    '::placeholder': {
                                        color: '#9CA3AF', // Tailwind gray-400
                                    },
                                },
                                invalid: {
                                    color: '#DC2626', // Tailwind red-600
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pay ${parcelInfo.cost}
                </button>
                {
                    error && <p className='text-red-600 font-semibold'>{error}</p>
                }
            </form>
        </div>

    );
};

export default PaymentFrom;