import React from "react";
import EmployeeDashboard from "../components/EmployeeDashboard";
import HRDashboard from "../components/HRDashboard";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        logout();
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <p className="text-gray-700 mb-4">Welcome, {username} ({role})</p>
            {role === "ROLE_EMPLOYEE" ? <EmployeeDashboard /> : <HRDashboard />}
        </div>
    );
}

export default Dashboard;
