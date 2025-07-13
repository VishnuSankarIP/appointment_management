
import React from 'react';
import { Calendar } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="bg-white shadow-lg w-64 min-h-screen p-4 hidden md:flex flex-col items-center space-y-8">
            <h2 className="text-2xl font-bold text-blue-700 tracking-wide">Dashboard</h2>

            <nav className="w-full">
                <ul className="space-y-3">
                    <li>
                        <button
                            className="flex items-center w-full gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 hover:text-blue-800 transition-all duration-200 group"
                        >
                            <Calendar className="w-5 h-5 text-blue-500 group-hover:text-blue-700 transition" />
                            <span className="text-sm font-medium">Calendar</span>
                        </button>
                    </li>

                </ul>
            </nav>

            <div className="mt-auto text-xs text-gray-400">© 2025 ClinicCal</div>
        </div>
    );
};

export default Sidebar;
