import React, { useState } from "react";
import EmployeeDashboard from "../components/EmployeeDashboard";
import HRDashboard from "../components/HRDashboard";

function Dashboard() {
    const [role, setRole] = useState("employee");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-4">
                <label className="mr-2">Select Role:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="employee">Employee</option>
                    <option value="hr">HR Manager</option>
                </select>
            </div>
            {role === "employee" ? <EmployeeDashboard /> : <HRDashboard />}
        </div>
    );
}

export default Dashboard;
