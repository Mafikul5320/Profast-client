import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { SignIn, UpdateProfile } = use(AuthContext);
    const userAxios = useAxios();
    const navigate = useNavigate()
    const [image, setImage] = useState();

    const onSubmit = (data) => {
        console.log(data)
        const { email, password, displayName } = data;
        SignIn(email, password).then(user => {
            const updateUser = {
                displayName,
                photoURL: image,
            }
            UpdateProfile(updateUser).then(async () => {
                console.log("Profile update Successfull");
                const userInfo = {
                    email,
                    displayName,
                    photoURL: image,
                    role: "user",
                    login_at: new Date().toISOString()
                }
                const userData = await userAxios.post('/users', userInfo);
                console.log(userData.data);
                if (userData.data.insertedId) {
                    navigate('/')
                };
            }).catch((error) => {
                console.log(error)
            })
            console.log(user)
        }).catch(error => {
            console.log(error)
        })
    }
    const handneluploadImage = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);
        const uploadImage = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);


        console.log(image);
        setImage(uploadImage.data.data.url);
    }
    return (
        <div className='max-w-xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8'>
            <h1 className='text-3xl sm:text-4xl py-3 font-bold text-center'>Create your account</h1>
            <p className='text-center text-sm font-semibold text-gray-400'>
                Or <Link className='text-blue-500' to={"/login"}>sign in to your existing account</Link>
            </p>
            <div className='my-8'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <input
                        type="text"
                        {...register('displayName', { required: true, minLength: 4 })}
                        placeholder="Enter name"
                        className="input h-11 rounded-full w-full"
                        required
                    />
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Enter Email"
                        className="input h-11 rounded-full w-full"
                        required
                    />
                    <input onChange={handneluploadImage} type="file" className="file-input file-input-ghost border border-gray-300 h-11 rounded-full w-full" />
                    <input
                        type="password"
                        {...register('password', {
                            required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
                        })}
                        placeholder="Enter Password"
                        className="input h-11 rounded-full w-full"
                    />
                    {
                        errors.password?.type === "pattern" && <p className='text-red-500 font-semibold'>Password must include uppercase, lowercase, number, special character and be at least 6 characters</p>
                    }
                    {
                        errors.password?.type === "required" && <p className='text-red-500 font-semibold'>Enter Password</p>
                    }
                    <button
                        className='btn h-11 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full w-full'
                        type='submit'
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;