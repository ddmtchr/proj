import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, saveToken } from "../api/auth";

const ROLE_PREFIX = "ROLE_";

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                const data = await login(username, password);
                saveToken(data.jwt);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                navigate("/dashboard");
            } else {
                await register(username, password, ROLE_PREFIX + role);
                setIsLogin(true);
            }
        } catch (err) {
            setError("Ошибка авторизации или регистрации. Проверьте данные.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold text-center">
                    {isLogin ? "Login" : "Register"}
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded mb-4"
                    />
                    {!isLogin && (
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-4"
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="HR">HR</option>
                        </select>
                    )}
                    <button
                        onClick={handleAuth}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {isLogin ? "Sign In" : "Register"}
                    </button>
                    <p
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 text-center cursor-pointer mt-4"
                    >
                        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
