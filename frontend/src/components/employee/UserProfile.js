import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Table from "../Table";

const API_BASE_URL = "http://localhost:8080/api";

function UserProfile() {
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка данных профиля
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/employee/me`);
                setProfileData([response.data]); // Преобразуем объект в массив для таблицы
                setLoading(false);
            } catch (err) {
                setError("Не удалось загрузить данные профиля.");
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    const columns = useMemo(
        () => [
            {accessorKey: "id", header: "ID", maxWidth: "20px"},
            {accessorKey: "fullName", header: "ФИО", maxWidth: "100px"},
            {accessorKey: "email", header: "Email", maxWidth: "80px"},
            {accessorKey: "phone", header: "Телефон", maxWidth: "50px"},
            {accessorKey: "position", header: "Должность", maxWidth: "80px"},
            {accessorKey: "level", header: "Уровень", maxWidth: "50px"},
            {accessorKey: "status", header: "Статус", maxWidth: "60px"},
            {accessorKey: "salary", header: "Зарплата", maxWidth: "50px"},
        ],
        []
    );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Профиль пользователя</h2>
            {loading ? (
                <p>Загрузка данных...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Table columns={columns} data={profileData} />
            )}
        </div>
    );
}

export default UserProfile;
