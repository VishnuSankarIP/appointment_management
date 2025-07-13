import React, { useState } from 'react';
import { patients } from '../data/patients';
import { doctors } from '../data/doctors';
import moment from 'moment';

const AppointmentForm = ({ date, onClose, onSave, initialData = null }) => {
    const [patientId, setPatientId] = useState(initialData?.patientId || '');
    const [doctorId, setDoctorId] = useState(initialData?.doctorId || '');
    const [time, setTime] = useState(initialData?.time || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientId || !doctorId || !time) {
            alert('Please fill out all fields.');
            return;
        }

        onSave({
            id: initialData?.id || `appt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            date: moment(date).format('YYYY-MM-DD'),
            time,
            patientId,
            doctorId,
        });

        // Reset form fields
        setPatientId('');
        setDoctorId('');
        setTime('');
    };

    return (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {initialData ? 'Edit Appointment' : 'Add Appointment'}
                </h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Patient
                    </label>
                    {/* <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Patient</option>
                        {patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select> */}
                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
                        required
                    >
                        <option value="" disabled>Select Patient</option>
                        {patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doctor
                    </label>
                    
                    <select
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-400"
                        required
                    >
                        <option value="" disabled>Select Doctor</option>
                        {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                    </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;