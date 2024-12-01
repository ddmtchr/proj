import React, {useState} from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

function EditModal({ type, data, onClose, onSuccess, nonEditableFields }) {
    const [formData, setFormData] = useState(data);

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
                    {Object.keys(data).map((key) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                name={key}
                                value={formData[key] || ""}
                                onChange={handleChange}
                                disabled={nonEditableFields.includes(key)}
                                className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
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
