import React, {useMemo} from "react";
import Table from "../Table";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

const API_BASE_URL = "http://localhost:8080/api"

function VacancyManagement({vacancies, onAdd, onEdit, onDelete, onToggleStatus, onViewCandidates}) {
    const columns = useMemo(
        () => [
            {header: "ID", accessorKey: "id", maxWidth: "20px"},
            {header: "Заголовок", accessorKey: "title", maxWidth: "70px"},
            {header: "Описание", accessorKey: "description", maxWidth: "150px"},
            {header: "Статус", accessorKey: "status", maxWidth: "50px"},
            {header: "Дата публикации", accessorKey: "postedDate", maxWidth: "60px"},
            {header: "Отдел", accessorKey: "department", maxWidth: "60px"},
            {
                header: "Действия",
                cell: ({row}) => (
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2">
                            <button
                                className={`${
                                    row.original.status === "OPEN"
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                } text-white py-1 px-3 rounded`}
                                onClick={() => handleToggleStatus(row.original)}
                            >
                                {row.original.status === "OPEN" ? "Закрыть" : "Открыть"}
                            </button>
                            <button
                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                onClick={() => handleViewCandidates(row.original)} // Устанавливаем ID вакансии
                            >
                                Кандидаты
                            </button>
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
        ],
        [onEdit, onDelete]
    );

    const handleToggleStatus = (vacancy) => {
        onToggleStatus(vacancy)
    };

    const handleAdd = (vacancy) => {
        onAdd(vacancy)
    };

    const handleEdit = (vacancy) => {
        onEdit(vacancy)
    };

    const handleDelete = (vacancy) => {
        onDelete(vacancy.id)
    };

    const handleViewCandidates = (vacancy) => {
        onViewCandidates(vacancy)
    };

    return (
        <div className="p-2">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Управление вакансиями</h2>
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded mb-4"
                    onClick={() => handleAdd()}
                >
                    Добавить
                </button>
            </div>
            <Table columns={columns} data={vacancies}/>
        </div>
    );
}

export default VacancyManagement;
