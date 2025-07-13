import React from 'react';
import { Link } from 'react-router';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold mt-4">Access Forbidden</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page.
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
