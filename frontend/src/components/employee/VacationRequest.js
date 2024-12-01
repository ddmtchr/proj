import React, {useEffect, useState} from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"

function VacationRequest() {
    const [vacations, setVacations] = useState([]);
    const [newVacation, setNewVacation] = useState({ startDate: "", endDate: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch user's vacation requests
    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const response = await axios.get(API_BASE_URL + "/vacation/my");
                setVacations(response.data);
            } catch (err) {
                console.error("Failed to fetch vacations", err);
            }
        };
        fetchVacations();
    }, []);

    // Submit a new vacation request
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!newVacation.startDate || !newVacation.endDate) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await axios.post(API_BASE_URL + "/vacation", newVacation);
            setSuccess("Vacation request submitted successfully!");
            setNewVacation({ startDate: "", endDate: "" });
            // Refresh vacations
            const response = await axios.get(API_BASE_URL+ "/vacation/my");
            setVacations(response.data);
        } catch (err) {
            setError("Failed to submit vacation request. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Мои отпуска</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <table className="min-w-full bg-white border mb-6">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Дата начала</th>
                    <th className="border px-4 py-2">Дата окончания</th>
                    <th className="border px-4 py-2">Статус</th>
                </tr>
                </thead>
                <tbody>
                {vacations.map((vacation) => (
                    <tr key={vacation.id}>
                        <td className="border px-4 py-2">{vacation.startDate}</td>
                        <td className="border px-4 py-2">{vacation.endDate}</td>
                        <td className="border px-4 py-2">{vacation.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3 className="text-xl font-bold mb-2">Запросить отпуск</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Дата начала</label>
                    <input
                        type="date"
                        value={newVacation.startDate}
                        onChange={(e) =>
                            setNewVacation((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                        className="max-width-500px border px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Дата окончания</label>
                    <input
                        type="date"
                        value={newVacation.endDate}
                        onChange={(e) =>
                            setNewVacation((prev) => ({ ...prev, endDate: e.target.value }))
                        }
                        className="max-width-500px border px-4 py-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Отправить запрос
                </button>
            </form>
        </div>
    );
}

export default VacationRequest;
