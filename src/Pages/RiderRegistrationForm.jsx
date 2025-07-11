import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const RiderRegistrationForm = () => {
    const regionDistrictData = useLoaderData();
    const { User } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const selectedRegion = watch('region');

    const uniqueRegions = useMemo(() => {
        const set = new Set(regionDistrictData.map(item => item.region));
        return Array.from(set);
    }, [regionDistrictData]);

    const filteredDistricts = useMemo(() => {
        return regionDistrictData
            .filter(item => item.region === selectedRegion)
            .map(item => item.district);
    }, [regionDistrictData, selectedRegion]);

    const onSubmit = (data) => {
        console.log('Form Submitted:', data);
        axiosSecure.post('/rider', data).then((res) => {
            console.log(res.data.insertedId)
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Submitted!',
                    text: `Thank you, ${data.name}. We'll contact you soon.`,
                    confirmButtonColor: '#16a34a' // Tailwind green-600
                });
            }

        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div className="min-h-screen bg-base-100 px-6 py-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-2">Be a Rider</h1>
                <p className="text-gray-600 mb-6">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 shadow-xl rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div>
                        <label className="label">Your Name</label>
                        <input
                            type="text"
                            value={User?.displayName || ''}
                            readOnly
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="label">Your Age</label>
                        <input
                            type="number"
                            {...register('age', {
                                required: 'Age is required',
                                min: { value: 18, message: 'Must be at least 18' }
                            })}
                            className="input input-bordered w-full"
                            placeholder="Your Age"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    <div>
                        <label className="label">Your Email</label>
                        <input
                            type="email"
                            value={User?.email || ''}
                            readOnly
                            {...register('email', { required: 'Email is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="label">Your Region</label>
                        <select
                            {...register('region', { required: 'Region is required' })}
                            className="select select-bordered w-full"
                            defaultValue=""
                        >
                            <option value="" disabled>Select your region</option>
                            {uniqueRegions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
                    </div>

                    <div>
                        <label className="label">NID No</label>
                        <input
                            type="text"
                            {...register('nid', { required: 'NID is required' })}
                            className="input input-bordered w-full"
                            placeholder="NID"
                        />
                        {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
                    </div>

                    <div>
                        <label className="label">Contact</label>
                        <input
                            type="text"
                            {...register('contact', { required: 'Contact is required' })}
                            className="input input-bordered w-full"
                            placeholder="Contact"
                        />
                        {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="label">Which warehouse do you want to work in?</label>
                        <select
                            {...register('warehouse', { required: 'Warehouse is required' })}
                            className="select select-bordered w-full"
                            defaultValue=""
                            disabled={!selectedRegion}
                        >
                            <option value="" disabled>Select warehouse</option>
                            {filteredDistricts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                        {errors.warehouse && <p className="text-red-500 text-sm">{errors.warehouse.message}</p>}
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="btn btn-success w-full">Submit</button>
                    </div>
                </form>
            </div>

            <div className="hidden md:block">
                <img src="/rider.png" alt="Rider" className="w-[300px]" />
            </div>
        </div>
    );
};

export default RiderRegistrationForm;
