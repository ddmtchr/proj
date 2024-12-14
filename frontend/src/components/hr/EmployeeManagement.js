import React, {useState} from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import Table from "../Table";

function EmployeeManagement({employees, onAdd, onEdit, onDelete, onDismiss}) {
    const [showDismissModal, setShowDismissModal] = useState(false);
    const [dismissalReason, setDismissalReason] = useState("");
    const [employeeToDismiss, setEmployeeToDismiss] = useState(null);

    const currentUsername = localStorage.getItem("username");

    const openDismissModal = (employee) => {
        setEmployeeToDismiss(employee);
        setShowDismissModal(true);
    }

    const columns = [
        {accessorKey: "id", header: "ID", maxWidth: "20px"},
        {accessorKey: "fullName", header: "ФИО", maxWidth: "100px"},
        {accessorKey: "email", header: "Email", maxWidth: "80px"},
        {accessorKey: "phone", header: "Телефон", maxWidth: "50px"},
        {accessorKey: "position", header: "Должность", maxWidth: "80px"},
        {accessorKey: "level", header: "Уровень", maxWidth: "50px"},
        {accessorKey: "status", header: "Статус", maxWidth: "60px"},
        {accessorKey: "dismissalReason", header: "Причина увольнения", maxWidth: "100px"},
        {accessorKey: "salary", header: "Зарплата", maxWidth: "50px"},
        {
            id: "actions",
            header: "Действия",
            cell: ({row}) => (
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                        {row.original.status !== "DISMISSED" && row.original.username !== currentUsername && (
                            <>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                    onClick={() => openDismissModal(row.original)}
                                >
                                    Уволить
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        {row.original.username !== currentUsername && (
                            <>
                                <button
                                    className="border-2 border-gray-500 py-1 px-1 rounded"
                                    onClick={() => handleEdit(row.original)}
                                >
                                    <PencilIcon className="h-5 w-5"/>
                                </button>
                                <button
                                    className="box-border border-2 border-gray-500 py-1 px-1 rounded"
                                    onClick={() => handleDelete(row.original.id)}
                                >
                                    <TrashIcon className="h-5 w-5"/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    const handleAdd = (type) => {
        onAdd(type);
    };

    const handleEdit = (employee) => {
        onEdit(employee);
    };

    const handleDismiss = () => {
        if (dismissalReason.trim() === "") {
            alert("Введите причину увольнения");
            return;
        }
        onDismiss(employeeToDismiss.id, dismissalReason);
        setShowDismissModal(false)
    };

    const handleDelete = (id) => {
        onDelete(id);
    };

    return (
        <div className="p-2">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Управление сотрудниками</h2>
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded mb-4"
                    onClick={() => handleAdd("employee")}
                >
                    Добавить
                </button>
            </div>
            <Table columns={columns} data={employees}/>
            {showDismissModal && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Причина увольнения</h3>
                        <textarea
                            value={dismissalReason}
                            onChange={(e) => setDismissalReason(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Введите причину увольнения"
                        />
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-500 text-white py-1 px-3 rounded"
                                onClick={() => setShowDismissModal(false)}
                            >
                                Отмена
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-3 rounded"
                                onClick={handleDismiss}
                            >
                                ОК
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeManagement;
