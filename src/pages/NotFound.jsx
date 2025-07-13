import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../assets/images/notfound.png'; // Adjust path as needed

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-72 h-auto mb-6"
      />
      <h1 className="text-5xl font-bold text-blue-700">404</h1>
      <p className="text-lg text-gray-700 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
