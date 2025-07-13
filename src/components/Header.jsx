
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.error('Logout successful');
        localStorage.removeItem('email');
        localStorage.removeItem('isLoggedIn');
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <>
            <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">ClinicCal</span>
                            <h1 className="text-xl font-bold">ClinicCal</h1>
                        </a>
                    </div>

                    {/* Mobile menu toggle button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Logout */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-200"
                        >
                            Log out
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">ClinicCal</span>
                                <h1 className="text-xl font-bold">ClinicCal</h1>
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Add Mobile Navigation Options here if needed */}
                        <div className="mt-6">
                        </div>

                        {/* Mobile Logout Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleLogout}
                                className="w-full px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-200"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </header>

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
        </>
    );
};

export default Header;

