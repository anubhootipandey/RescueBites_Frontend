import React from "react";

export default function GuestDashboard() {
  const guest = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {guest?.username || "Guest"} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          You're currently logged in as a guest. Enjoy exploring limited features of RescueBites.
        </p>
        <div className="text-sm text-gray-400">
          This is a temporary session. To access more features, please{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            sign up or login
          </a>
          .
        </div>
      </div>
    </div>
  );
}
