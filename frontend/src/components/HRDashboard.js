import React from "react";

function HRDashboard() {
    return (
        <div>
            <h2 className="text-xl font-bold">HR Dashboard</h2>
            <p>Welcome, HR Manager!</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                Manage Employees
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded mt-4 ml-2">
                Manage Vacancies
            </button>
        </div>
    );
}

export default HRDashboard;
