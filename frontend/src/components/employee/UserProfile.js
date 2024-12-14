import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import Table from "../Table";
import {PencilIcon} from "@heroicons/react/24/outline";

const API_BASE_URL = "http://localhost:8080/api";

function UserProfile({canEdit, onEdit}) {
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/employee/me`);
                setProfileData([response.data]);
                setLoading(false);
            } catch (err) {
                setError("Не удалось загрузить данные профиля.");
                setLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    const handleEdit = (employee) => {
        onEdit(employee);
    };

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
            {accessorKey: "vacationDays", header: "Дни отпуска", maxWidth: "50px"},
            {
                id: "actions",
                header: "",
                cell: ({row}) => (
                    <div className="flex justify-between items-center gap-2">
                        {/*<div className="flex gap-2">*/}
                        {/*    {row.original.status !== "DISMISSED" && row.original.username !== currentUsername && (*/}
                        {/*        <>*/}
                        {/*            <button*/}
                        {/*                className="bg-red-500 text-white py-1 px-3 rounded"*/}
                        {/*                onClick={() => openDismissModal(row.original)}*/}
                        {/*            >*/}
                        {/*                Уволить*/}
                        {/*            </button>*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className="flex justify-end gap-2">
                            {canEdit && (
                                <>
                                    <button
                                        className="border-2 border-gray-500 py-1 px-1 rounded"
                                        onClick={() => handleEdit(row.original)}
                                    >
                                        <PencilIcon className="h-5 w-5"/>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ),
            }
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
                <Table columns={columns} data={profileData}/>
            )}
        </div>
    );
}

export default UserProfile;
