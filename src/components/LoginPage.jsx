import React, { useState } from 'react';
import Banner from '../assets/images/signinbanner.png';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [error, setErrors] = useState({ email: '', password: '' });

    const navigate = useNavigate()

    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Please fill out all fields.');
            return;
        }

        // Simulate login delay
        toast.loading('Please wait...');

        setTimeout(() => {
            toast.dismiss(); // Remove loading toast

            if (email === 'staff@clinic.com' && password === '123456') {
                toast.success('Login successful');
                localStorage.setItem('email', email);
                localStorage.setItem('isLoggedIn', 'true');
                setTimeout(() => {
                    navigate('/calendar');
                }, 1500);
            } else {
                toast.error('Invalid email or password');
            }
        }, 1000); // simulate API call
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side image */}
            <div className="w-full md:w-1/2 h-96 md:h-auto">
                <img
                    src={Banner}
                    alt="Login Visual"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white md:rounded-l-3xl">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-2">ClinicCal</h2>
                    <p className="text-gray-600 mb-6">Login to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
                        </div>

                        <div>
                            <label className='block text-sm text-gray-700 mb-1'>Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        // Eye Open Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        // Eye Off Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Don’t have an account? <a href="#" className="text-black font-medium">Create one</a>
                    </p>
                </div>
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#ffffff',
                        color: '#000000',
                        borderLeft: '5px solid #5CE65C',
                    },
                }}
            />
        </div>
    );
};

export default LoginPage;
