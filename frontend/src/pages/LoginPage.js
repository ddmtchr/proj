import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;