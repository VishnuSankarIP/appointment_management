
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from './AppointmentForm';
import { patients } from '../data/patients';
import { doctors } from '../data/doctors';
import Header from './Header';
import { Edit3, Trash2, ChevronLeft, ChevronRight, Stethoscope, User, Timer } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import useIsMobile from '../hooks/UseIsMobile';
import Sidebar from './Sidebar';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('appointments');
        return saved ? JSON.parse(saved) : [];
    });
    const [showForm, setShowForm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [editAppointment, setEditAppointment] = useState(null);
    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterPatient, setFilterPatient] = useState('');
    const isMobile = useIsMobile();

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const handleSelectSlot = ({ start }) => {
        setSelectedSlot(start);
        setShowForm(false);
    };

    const handleSave = (appointment) => {
        const appointmentDate = appointment.date;
        const appointmentTime = appointment.time;

        const isDuplicate = appointments.some(
            (appt) =>
                appt.patientId === appointment.patientId &&
                appt.date === appointmentDate &&
                (!editAppointment || appt.id !== editAppointment.id)
        );

        const isDuplicateDoctorTime = appointments.some(
            (appt) =>
                appt.doctorId === appointment.doctorId &&
                appt.date === appointmentDate &&
                appt.time === appointmentTime &&
                (!editAppointment || appt.id !== editAppointment.id)
        );

        if (isDuplicate) {
            toast.error("This patient already has an appointment on this date.");
            return;
        }

        if (isDuplicateDoctorTime) {
            toast.error("This doctor already has an appointment at this time.");
            return;
        }

        if (editAppointment) {
            setAppointments((prev) =>
                prev.map((appt) => (appt.id === editAppointment.id ? appointment : appt))
            );
        } else {
            setAppointments((prev) => [...prev, appointment]);
        }
        setShowForm(false);
        setEditAppointment(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
        if (confirmDelete) {
            setAppointments((prev) => prev.filter((appt) => appt.id !== id));
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedSlot(new Date(event.date));
        setShowForm(false);
    };

    const navigateDay = (direction) => {
        const newDate = selectedSlot
            ? moment(selectedSlot).add(direction, 'days').toDate()
            : moment().add(direction, 'days').toDate();
        setSelectedSlot(newDate);
    };

    const filteredAppointments = appointments.filter((appt) => {
        const matchesDoctor = filterDoctor ? appt.doctorId === filterDoctor : true;
        const matchesPatient = filterPatient ? appt.patientId === filterPatient : true;
        return matchesDoctor && matchesPatient;
    });

    const events = filteredAppointments.map((appt) => {
        const patient = patients.find((p) => p.id === parseInt(appt.patientId));
        const doctor = doctors.find((d) => d.id === parseInt(appt.doctorId));
        return {
            ...appt,
            title: `${patient?.name} - ${moment(appt.time, 'HH:mm').format('h:mm A')}`,
            start: new Date(appt.date + 'T' + appt.time),
            end: new Date(moment(appt.date + 'T' + appt.time).add(30, 'minutes')),
        };
    });

    const formattedSelectedSlot = selectedSlot
        ? moment(selectedSlot).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');

    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ">
                    {/* Filter Section */}

                    <div className="p-4 bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end gap-4">

                            {/* Filter by Doctor */}
                            <div className="w-full sm:w-48">
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Filter by Doctor
                                </label>
                                <select
                                    value={filterDoctor}
                                    onChange={(e) => setFilterDoctor(e.target.value)}
                                    className="block w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                >
                                    <option value="">All Doctors</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Filter by Patient */}
                            <div className="w-full sm:w-48">
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Filter by Patient
                                </label>
                                <select
                                    value={filterPatient}
                                    onChange={(e) => setFilterPatient(e.target.value)}
                                    className="block w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                >
                                    <option value="">All Patients</option>
                                    {patients.map((patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>


                    {isMobile ? (
                        <div className="p-4 min-h-screen">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => navigateDay(-1)}
                                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white hover:bg-gray-300 text-sm sm:text-base"
                                    aria-label="Previous day"
                                >
                                    <ChevronLeft />
                                </button>
                                <input
                                    type="date"
                                    value={formattedSelectedSlot}
                                    onChange={(e) => setSelectedSlot(moment(e.target.value, 'YYYY-MM-DD').toDate())}
                                    className="p-2 border rounded-md w-36 sm:w-40 text-center text-sm sm:text-base"
                                />
                                <button
                                    onClick={() => navigateDay(1)}
                                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white hover:bg-gray-300 text-sm sm:text-base"
                                    aria-label="Next day"
                                >
                                    <ChevronRight />
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-md font-semibold text-blue-700">
                                        Appointments on {moment(formattedSelectedSlot).format('MMMM Do, YYYY')}
                                    </h4>
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm sm:text-base"
                                        onClick={() => setShowForm(true)}
                                    >
                                        + Add
                                    </button>
                                </div>
                                {filteredAppointments.filter((appt) => appt.date === formattedSelectedSlot).length === 0 ? (
                                    <p className="text-gray-500">No appointments found.</p>
                                ) : (
                                    filteredAppointments
                                        .filter((appt) => appt.date === formattedSelectedSlot)
                                        .map((appt) => {
                                            const patient = patients.find((p) => p.id === parseInt(appt.patientId));
                                            const doctor = doctors.find((d) => d.id === parseInt(appt.doctorId));
                                            return (
                                                <div
                                                    key={appt.id}
                                                    className="bg-white p-3 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200 active:scale-[0.98] transform"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-gray-800 truncate flex items-center gap-2">
                                                                <span className="text-blue-500"><User /></span> {patient?.name}
                                                            </p>
                                                            <p className="text-gray-600 truncate flex items-center gap-2">
                                                                <span className="text-green-500"><Stethoscope /></span> {doctor?.name}
                                                            </p>
                                                            <p className="text-gray-600 flex items-center gap-2">
                                                                <span className="text-purple-500"><Timer /></span> {moment(appt.time, 'HH:mm').format('h:mm A')}
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setEditAppointment(appt);
                                                                    setShowForm(true);
                                                                }}
                                                                className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 active:bg-yellow-300 transition-colors duration-150"
                                                                aria-label="Edit appointment"
                                                            >
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(appt.id)}
                                                                className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 active:bg-red-300 transition-colors duration-150"
                                                                aria-label="Delete appointment"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {selectedSlot && !showForm && (
                                <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold">
                                                Appointments on {moment(selectedSlot).format('MMMM Do, YYYY')}
                                            </h2>
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                onClick={() => setShowForm(true)}
                                            >
                                                + Add Appointment
                                            </button>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                                                    <tr>
                                                        <th className="p-2">SL</th>
                                                        <th className="p-2">Patient</th>
                                                        <th className="p-2">Doctor</th>
                                                        <th className="p-2">Time</th>
                                                        <th className="p-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredAppointments.filter(
                                                        (appt) => appt.date === moment(selectedSlot).format('YYYY-MM-DD')
                                                    ).length === 0 ? (
                                                        <tr>
                                                            <td colSpan="5" className="p-4 text-center text-gray-500">
                                                                No data found
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredAppointments
                                                            .filter((appt) => appt.date === moment(selectedSlot).format('YYYY-MM-DD'))
                                                            .map((appt, index) => {
                                                                const patient = patients.find((p) => p.id === parseInt(appt.patientId));
                                                                const doctor = doctors.find((d) => d.id === parseInt(appt.doctorId));
                                                                return (
                                                                    <tr key={appt.id} className="hover:bg-gray-50">
                                                                        <td className="p-2">{index + 1}</td>
                                                                        <td className="p-2">{patient?.name}</td>
                                                                        <td className="p-2">{doctor?.name}</td>
                                                                        <td className="p-2">{moment(appt.time, 'HH:mm').format('h:mm A')}</td>
                                                                        <td className="p-2 space-x-2">
                                                                            <button
                                                                                onClick={() => {
                                                                                    setEditAppointment(appt);
                                                                                    setShowForm(true);
                                                                                }}
                                                                                className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 active:bg-yellow-300 transition-colors duration-150"
                                                                            >
                                                                                <Edit3 className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(appt.id)}
                                                                                className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 active:bg-red-300 transition-colors duration-150"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                className="text-white p-2 bg-red-400 rounded-md hover:bg-red-200 active:bg-red-300 transition-colors duration-150"
                                                onClick={() => {
                                                    setSelectedSlot(null);
                                                    setEditAppointment(null);
                                                }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-5 m-5 min-h-screen overflow-auto bg-white-100 rounded-lg shadow-md hover:shadow-lg">
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    selectable
                                    onSelectSlot={handleSelectSlot}
                                    onSelectEvent={handleSelectEvent}
                                    defaultView="month"
                                    views={['day', 'month']}
                                    style={{ height: '80vh', minWidth: '100%' }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showForm && (
                <AppointmentForm
                    date={selectedSlot || new Date()}
                    initialData={editAppointment}
                    onClose={() => {
                        setShowForm(false);
                        setEditAppointment(null);
                    }}
                    onSave={handleSave}
                />
            )}
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

export default CalendarPage;


