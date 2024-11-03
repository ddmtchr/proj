import React from "react";

function EmployeeDashboard() {
    return (
        <div>
            <h2 className="text-xl font-bold">Employee Dashboard</h2>
            <p>Welcome, Employee!</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded mt-4">
                Request Vacation
            </button>
        </div>
    );
}

export default EmployeeDashboard;