import React, { useState } from "react";
import axios from "axios";
import useNotification from "./useNotification";
import Notification from "./Notification";

const API_BASE_URL = "http://localhost:8080/api";
const formConfigurations = {
    employee: [
        { name: "userId", label: "ID пользователя", type: "select", required: true },
        { name: "fullName", label: "ФИО", type: "text", required: true },
        { name: "birthDate", label: "Дата рождения", type: "date", required: true },
        { name: "phone", label: "Телефон", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: true },
        { name: "position", label: "Должность", type: "text", required: true },
        { name: "level", label: "Уровень", type: "select", options: ["INTERN", "JUNIOR", "MIDDLE", "SENIOR", "LEAD"], required: true },
        { name: "status", label: "Статус", type: "select", options: ["ON_PROBATION", "FAILED_PROBATION", "PERMANENT_EMPLOYEE", "DISMISSED"], required: true },
        { name: "department", label: "Отдел", type: "text", required: true },
        { name: "vacationDays", label: "Дни отпуска", type: "number", required: false },
        { name: "salary", label: "Зарплата", type: "number", required: true },
        { name: "employmentDate", label: "Дата трудоустройства", type: "date", required: true }
    ],
    vacation: [
        { name: "startDate", label: "Дата начала", type: "date", required: true },
        { name: "endDate", label: "Дата окончания", type: "date", required: true }
    ],
    vacancy: [
        { name: "title", label: "Название", type: "text", required: true },
        { name: "description", label: "Описание", type: "textarea", required: true },
        { name: "salary", label: "Зарплата", type: "number" },
        { name: "department", label: "Отдел", type: "text", required: true }
    ],
    candidate: [
        { name: "vacancyId", label: "ID вакансии", type: "select", required: true },
        { name: "fullName", label: "ФИО", type: "text", required: true },
        { name: "phone", label: "Телефон", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: false },
        { name: "status", label: "Статус", type: "select", options: ["SENT_CV", "REJECTED_CV", "PENDING_TEST_TASK", "REJECTED_TEST_TASK", "PENDING_INTERVIEW", "REJECTED_INTERVIEW", "SENT_OFFER", "REJECTED_OFFER", "ACCEPTED"], required: true }
    ]
};

const russian = {
    employee: "Сотрудник добавлен успешно",
    vacation: "Отпуск добавлен успешно",
    vacancy: "Вакансия добавлена успешно",
    candidate: "Кандидат добавлен успешно"
}

function AddModal({ type, onClose, onSuccess, onError, availableUserIds, availableVacancyIds }) {
    const formFields = formConfigurations[type] || [];
    const initialData = formFields.reduce((acc, field) => {
        acc[field.name] = field.type === "checkbox" ? false : ""; // Начальное значение
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialData);
    const { notifications, addNotification, removeNotification } = useNotification();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            let url = `${API_BASE_URL}/${type}`
            if (formData.userId) {
                url += `?userId=${formData.userId}`
            } else if (formData.vacancyId) {
                url += `?vacancyId=${formData.vacancyId}`
            }
            await axios.post(
                url,
                formData).then(r => {
                    onSuccess(russian[type]); // Обновить данные
                }

            ).catch(e =>
                onError("Ошибка при добавлении")
            );
            onClose(); // Закрыть модальное окно
        } catch (error) {
            console.error(`Error adding ${type}:`, error);
        }
    };

    function clickOutside(e) {
        if (e.target.id === "rootDiv") onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" id="rootDiv" onClick={clickOutside}>
            <div className="max-h-screen overflow-auto bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add {type}</h2>
                <form className="space-y-4">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.name === "userId" && (
                                <select
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    required
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Select User ID</option>
                                    {availableUserIds.map((id) => (
                                        <option key={id} value={id}>
                                            {id}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.name === "vacancyId" && (
                                <select
                                    name="vacancyId"
                                    value={formData.vacancyId}
                                    onChange={handleChange}
                                    required
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="">Select Vacancy ID</option>
                                    {availableVacancyIds.map((id) => (
                                        <option key={id} value={id}>
                                            {id}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.type === "text" && field.name !== "userId" && field.name !== "vacancyId" && (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "textarea" && field.name !== "userId" && field.name !== "vacancyId" && (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "select" && field.name !== "userId" && field.name !== "vacancyId" && (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                >
                                    <option value="">Select an option</option>
                                    {field.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.type === "date" && field.name !== "userId" && field.name !== "vacancyId" && (
                                <input
                                    type="date"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "number" && field.name !== "userId" && field.name !== "vacancyId" && (
                                    <input
                                        type="number"
                                        name={field.name}
                                        onChange={handleChange}
                                        className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                            )}
                        </div>
                    ))}
                </form>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Добавить
                    </button>
                </div>
            </div>
            <Notification notifications={notifications} removeNotification={removeNotification} />
        </div>
    );
}

export default AddModal;
