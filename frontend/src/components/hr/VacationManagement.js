import React, {useMemo, useState} from "react";
import Table from "../Table";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

const API_BASE_URL = "http://localhost:8080/api"

function VacationManagement({vacations, onAdd, onEdit, onApprove, onReject, onStart, onFinish, onDelete}) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [vacationToReject, setVacationToReject] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const columns = useMemo(
        () => [
            {header: "ID", accessorKey: "id", maxWidth: "20px"},
            {header: "ID сотрудника", accessorKey: "employeeId", maxWidth: "50px"},
            {header: "Дата запроса", accessorKey: "requestDate", maxWidth: "60px"},
            {header: "Дата начала", accessorKey: "startDate", maxWidth: "60px"},
            {header: "Дата окончания", accessorKey: "endDate", maxWidth: "60px"},
            {header: "Статус", accessorKey: "status", maxWidth: "50px"},
            {header: "Причина отклонения", accessorKey: "rejectionReason", maxWidth: "100px"},
            {
                header: "Действия",
                cell: ({row}) => (
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2">
                            {row.original.status === "PENDING" && (
                                <>
                                    <button
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                        onClick={() => handleApprove(row.original)}
                                    >
                                        Принять
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded"
                                        onClick={() => openRejectModal(row.original)}
                                    >
                                        Отклонить
                                    </button>
                                </>
                            )}
                            {row.original.status === "APPROVED" && (
                                <>
                                    <button
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                        onClick={() => handleStart(row.original)}
                                    >
                                        Начать
                                    </button>
                                </>
                            )}
                            {row.original.status === "VACATION" && (
                                <>
                                    <button
                                        className="bg-green-500 text-white py-1 px-3 rounded"
                                        onClick={() => handleFinish(row.original)}
                                    >
                                        Завершить
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
                                onClick={() => handleDelete(row.original)}
                            >
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>

                ),
            },
        ],
        []
    );

    const openRejectModal = (vacation) => {
        setVacationToReject(vacation);
        setShowRejectModal(true);
    };

    const handleApprove = (vacation) => {
        onApprove(vacation.id);
    };

    const handleReject = () => {
        if (rejectReason.trim() === "") {
            setErrorMessage("Введите причину отклонения");
            return;
        }
        onReject(vacationToReject.id, rejectReason);
        setShowRejectModal(false)
        setErrorMessage("")
    };

    const handleStart = (vacation) => {
        onStart(vacation.id);
    };

    const handleFinish = (vacation) => {
        onFinish(vacation.id);
    };

    const handleAdd = (vacation) => {
        onAdd(vacation)
    };

    const handleEdit = (vacation) => {
        onEdit(vacation)
    };

    const handleDelete = (vacation) => {
        onDelete(vacation.id)
    };

    return (
        <div className="p-2">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Управление отпусками</h2>
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded mb-4"
                    onClick={() => handleAdd()}
                >
                    Добавить
                </button>
            </div>
            <Table columns={columns} data={vacations}/>
            {showRejectModal && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Причина отклонения</h3>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => {
                                setRejectReason(e.target.value);
                                if (e.target.value.trim() !== "") {
                                    setErrorMessage("");
                                }
                            }}
                            className="w-full p-2 border border-gray-300 rounded mb-1"
                            placeholder="Введите причину отклонения"
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-500 text-white py-1 px-3 rounded"
                                onClick={() => setShowRejectModal(false)}
                            >
                                Отмена
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-3 rounded"
                                onClick={handleReject}
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

export default VacationManagement;
