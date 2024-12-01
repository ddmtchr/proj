import React, {useState} from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const formConfigurations = {
    employee: [
        { name: "fullName", label: "ФИО", type: "text", required: true },
        { name: "birthDate", label: "Дата рождения", type: "date", required: true },
        { name: "phone", label: "Телефон", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: true },
        { name: "position", label: "Должность", type: "text", required: true },
        { name: "level", label: "Уровень", type: "select", options: ["INTERN", "JUNIOR", "MIDDLE", "SENIOR", "LEAD"], required: true },
        { name: "status", label: "Статус", type: "select", options: ["ON_PROBATION", "FAILED_PROBATION", "PERMANENT_EMPLOYEE", "DISMISSED"], required: true },
        { name: "department", label: "Отдел", type: "text", required: true },
        { name: "vacationDays", label: "Дни отпуска", type: "text", required: false },
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
        { name: "fullName", label: "ФИО", type: "text", required: true },
        { name: "phone", label: "Телефон", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: false },
        { name: "status", label: "Статус", type: "select", options: ["SENT_CV", "REJECTED_CV", "PENDING_TEST_TASK", "REJECTED_TEST_TASK", "PENDING_INTERVIEW", "REJECTED_INTERVIEW", "SENT_OFFER", "REJECTED_OFFER", "ACCEPTED"], required: true }
    ]
};


function EditModal({ type, data, onClose, onSuccess, nonEditableFields }) {
    const [formData, setFormData] = useState(data);
    const formFields = formConfigurations[type] || [];

    // Обработчик изменения полей ввода
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Отправка изменений
    const handleSubmit = async () => {
        try {
            await axios.put(
                `${API_BASE_URL}/${type}/${formData.id}`,
                formData);
            onSuccess(`/${type}`); // Обновить данные
            onClose(); // Закрыть модальное окно
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    function clickOutside(e) {
        if (e.target.id === "rootDiv") onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" id="rootDiv" onClick={clickOutside}>
            <div className="max-h-screen overflow-auto bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Edit {type}</h2>
                <form className="space-y-4">
                    {formFields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.type === "text" && (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "textarea" && (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "select" && (
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
                            {field.type === "date" && (
                                <input
                                    type="date"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required={field.required}
                                />
                            )}
                            {field.type === "number" && (
                                <input
                                    type="number"
                                    name={field.name}
                                    value={formData[field.name]}
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
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
