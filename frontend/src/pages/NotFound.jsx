import React from "react";

function NotFound() {
  return (
    <div className="text-center flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
