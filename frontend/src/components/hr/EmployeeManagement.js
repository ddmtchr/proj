import React from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import Table from "../Table";

const API_BASE_URL = "http://localhost:8080/api"

function EmployeeManagement({employees, onAdd, onEdit, onDelete, onDismiss}) {
    const columns = [
        {accessorKey: "id", header: "ID", maxWidth: "20px"},
        {accessorKey: "fullName", header: "ФИО", maxWidth: "100px"},
        {accessorKey: "email", header: "Email", maxWidth: "80px"},
        {accessorKey: "phone", header: "Телефон", maxWidth: "50px"},
        {accessorKey: "position", header: "Должность", maxWidth: "80px"},
        {accessorKey: "level", header: "Уровень", maxWidth: "50px"},
        {accessorKey: "status", header: "Статус", maxWidth: "60px"},
        {accessorKey: "salary", header: "Зарплата", maxWidth: "50px"},
        {
            id: "actions",
            header: "Действия",
            cell: ({row}) => (
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                        {row.original.status !== "DISMISSED" && (
                            <>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                    onClick={() => handleDismiss(row.original)}
                                >
                                    Уволить
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
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

    const handleDismiss = (employee) => {
        onDismiss(employee.id);
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
        </div>
    );
}

export default EmployeeManagement;
