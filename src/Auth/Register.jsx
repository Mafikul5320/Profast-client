import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { SignIn } = use(AuthContext);

    const onSubmit = (data) => {
        console.log(data)
        const { email, password } = data;
        SignIn(email, password).then(user => {
            console.log(user)
        }).catch(error => {
            console.log(error)
        })
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
                    <input
                        type="text"
                        {...register('photoURL')}
                        placeholder="Photo URL"
                        className="input h-11 rounded-full w-full"
                        required
                    />
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