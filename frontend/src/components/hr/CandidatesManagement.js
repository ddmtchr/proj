import React from "react";
import Table from "../Table";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline"; // Импортируем таблицу

const API_BASE_URL = "http://localhost:8080/api"

function CandidatesManagement({ candidates, onAdd, onEdit, onDelete }) {
    const columns = [
        { header: "ID", accessorKey: "id", maxWidth: "20px" },
        { header: "ФИО", accessorKey: "fullName", maxWidth: "100px" },
        { header: "Email", accessorKey: "email", maxWidth: "80px" },
        { header: "Статус", accessorKey: "status", maxWidth: "70px" },
        {
            header: "Действия",
            cell: ({row}) => (
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
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
                            onClick={() => handleDelete(row.original)}
                        >
                            <TrashIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    const handleAdd = (type) => {
        onAdd(type)
    }

    const handleEdit = (candidate) => {
        onEdit(candidate)
    }

    const handleDelete = (candidate) => {
        onDelete(candidate.id)
    }

    return (
        <div className="p-2">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Управление кандидатами</h2>
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded mb-4"
                    onClick={() => handleAdd("candidate")}
                >
                    Добавить
                </button>
            </div>
            <Table columns={columns} data={candidates}/>
        </div>
    );
}

export default CandidatesManagement;
