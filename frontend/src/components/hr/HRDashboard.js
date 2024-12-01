import React, {useEffect, useState} from "react";
import EmployeeManagement from "./EmployeeManagement";
import VacationManagement from "./VacationManagement";
import VacancyManagement from "./VacancyManagement";
import CandidatesManagement from "./CandidatesManagement";
import axios from "axios";
import EditModal from "../EditModal";
import AddModal from "../AddModal";
import UserProfile from "../employee/UserProfile";

const API_BASE_URL = "http://localhost:8080/api"

function HRDashboard() {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("activeTab") || "employee";
    });
    const [availableUserIds, setAvailableUserIds] = useState([]);
    const [availableVacancyIds, setAvailableVacancyIds] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [vacations, setVacations] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    const [vacancyId, setVacancyId] = useState(null);
    const [currentType, setCurrentType] = useState(null);

    const nonEditableFieldsByTab = {
        employee: ["id", "dismissalReason", "dismissalDate"],
        vacation: ["id", "status", "employeeId", "requestDate", "rejectionReason"],
        vacancy: ["id", "status", "postedDate", "closedDate"],
        candidate: ["id", "vacancyId"],
    };

    useEffect(() => {
        if (currentType === "employee") {
            fetchAvailableIds(API_BASE_URL + "/users/notRegistered").then(setAvailableUserIds);
        } else if (currentType === "candidate") {
            fetchAvailableIds(API_BASE_URL + "/vacancy").then(setAvailableVacancyIds);
        }
    }, [currentType]);

    async function fetchAvailableIds(endpoint) {
        try {
            const response = await axios.get(endpoint)
            return response.data.map(o => o.id)
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const handleAdd = (type) => {
        setCurrentType(type);
        setIsAddModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setEditModalData({type: "employee", data: employee});
    };

    const handleDeleteEmployee = async (id) => {
        await axios.delete(API_BASE_URL + `/employee/${id}`)
            .then((response) => {
                refreshData("/employee")
            })
            .catch((error) => console.error("Error deleting employee: ", error))
    };

    const handleDismissEmployee = async (id) => {
        await axios.put(API_BASE_URL + `/employee/${id}/dismiss`)
            .then((response) => {
                refreshData("/employee")
            })
            .catch((error) => console.error("Error dismissing employee: ", error))
    };

    const handleEditVacation = (vacation) => {
        setEditModalData({type: "vacation", data: vacation});
    };

    const handleApproveVacation = async (id) => {
        await axios
            .put(API_BASE_URL + `/vacation/${id}/approve`)
            .then(() => {
                console.log(`Vacation ${id} approved`);
                refreshData("/vacation")
            })
            .catch((error) => console.error("Error approving vacation:", error));
    };

    const handleRejectVacation = (id, reason) => {
        axios
            .put(API_BASE_URL + `/vacation/${id}/reject`, {reason: reason})
            .then(() => {
                console.log(`Vacation ${id} rejected`);
                refreshData("/vacation")
            })
            .catch((error) => console.error("Error rejecting vacation:", error));
    };

    const handleStartVacation = (id) => {
        axios
            .put(API_BASE_URL + `/vacation/${id}/start`)
            .then(() => {
                console.log(`Vacation ${id} started`);
                refreshData("/vacation")
            })
            .catch((error) => console.error("Error starting vacation:", error));
    };

    const handleFinishVacation = (id) => {
        axios
            .put(API_BASE_URL + `/vacation/${id}/finish`)
            .then(() => {
                console.log(`Vacation ${id} finished`);
                refreshData("/vacation")
            })
            .catch((error) => console.error("Error finishing vacation:", error));
    };

    const handleDeleteVacation = (id) => {
        axios
            .delete(API_BASE_URL + `/vacation/${id}`)
            .then(() => {
                console.log(`Vacation ${id} deleted`);
                refreshData("/vacation")
            })
            .catch((error) => console.error("Error deleting vacation:", error));
    };

    const handleEditVacancy = (vacancy) => {
        setEditModalData({type: "vacancy", data: vacancy});
    };

    const handleDeleteVacancy = (id) => {
        axios
            .delete(API_BASE_URL + `/vacancy/${id}`)
            .then(() => {
                console.log(`Vacancy ${id} deleted`);
                refreshData("/vacancy")
            })
            .catch((error) => console.error("Error deleting vacancy:", error));
    };

    const handleToggleStatusVacancy = (vacancy) => {
        const newStatus = vacancy.status === "OPEN" ? "CLOSED" : "OPEN";
        if (newStatus === "OPEN") {
            axios
                .put(API_BASE_URL + `/vacancy/${vacancy.id}/reopen`)
                .then(() => {
                    console.log(`Vacancy ${vacancy.id} updated to ${newStatus}`);
                    refreshData("/vacancy")
                })
                .catch((error) => console.error("Error updating vacancy status:", error));
        } else {
            axios
                .put(API_BASE_URL + `/vacancy/${vacancy.id}/close`)
                .then(() => {
                    console.log(`Vacancy ${vacancy.id} updated to ${newStatus}`);
                    refreshData("/vacancy")
                })
                .catch((error) => console.error("Error updating vacancy status:", error));
        }
    }

    const handleViewVacancyCandidates = (vacancy) => {
        setVacancyId(vacancy.id)
        axios
            .get(API_BASE_URL + `/candidate/vacancy?vacancyId=${vacancy.id}`)
            .then((response) => {
                console.log("CandidatesManagement for vacancy:", response.data);
                setCandidates(response.data)
                setActiveTab("candidate")
            })
            .catch((error) => console.error("Error fetching candidates:", error));
    }

    const handleEditCandidate = (candidate) => {
        setEditModalData({type: "candidate", data: candidate});
    };

    const handleDeleteCandidate = (id) => {
        axios
            .delete(API_BASE_URL + `/candidate/${id}`)
            .then(() => {
                console.log(`Candidate ${id} deleted`);
                refreshData("/candidate")
            })
            .catch((error) => console.error("Error deleting candidate:", error));
    };

    const handleCloseModal = () => {
        setEditModalData(null);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const refreshData = async (url) => {
        console.log('refresh')
        try {
            axios.get(API_BASE_URL + url)
                .then((response) => {
                    switch (url) {
                        case "/employee":
                            setEmployees(response.data);
                            break;
                        case "/vacation":
                            setVacations(response.data);
                            break;
                        case "/vacancy":
                            setVacancies(response.data);
                            break;
                        case "/candidate":
                            setCandidates(response.data);
                            break;
                    }
                })
        } catch (error) {
            console.error("Error fetching:", error);
        }
    };

    useEffect(() => {
        if (!(activeTab === "candidate" && vacancyId) && !(activeTab === "profile")) {
            refreshData(`/${activeTab}`);
        }
    }, [activeTab, vacancyId]);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab)
    }, [activeTab]);

    const handleTabClick = (tab) => {
        if (tab === "candidate") {
            setVacancyId(null); // Сбрасываем фильтр кандидатов
        }
        setActiveTab(tab);
    }

    return (
        <div>
            <div className="border-b border-gray-300 mb-4">
                <div className="flex space-x-4">
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === "employee"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("employee")}
                    >
                        Сотрудники
                    </button>
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === "vacation"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("vacation")}
                    >
                        Отпуска
                    </button>
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === "vacancy"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("vacancy")}
                    >
                        Вакансии
                    </button>
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === "candidate"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("candidate")}
                    >
                        Кандидаты
                    </button>
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeTab === "profile"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("profile")}
                    >
                        Профиль
                    </button>
                </div>
            </div>

            {activeTab === "employee" && (
                <EmployeeManagement
                    employees={employees}
                    onAdd={handleAdd}
                    onEdit={handleEditEmployee}
                    onDelete={handleDeleteEmployee}
                    onDismiss={handleDismissEmployee}
                />
            )}
            {activeTab === "vacation" && (
                <VacationManagement
                    vacations={vacations}
                    onAdd={handleAdd}
                    onEdit={handleEditVacation}
                    onApprove={handleApproveVacation}
                    onReject={handleRejectVacation}
                    onStart={handleStartVacation}
                    onFinish={handleFinishVacation}
                    onDelete={handleDeleteVacation}
                />
            )}
            {activeTab === "vacancy" && (
                <VacancyManagement
                    vacancies={vacancies}
                    onAdd={handleAdd}
                    onEdit={handleEditVacancy}
                    onDelete={handleDeleteVacancy}
                    onToggleStatus={handleToggleStatusVacancy}
                    onViewCandidates={handleViewVacancyCandidates}
                />
            )}
            {activeTab === "candidate" && (
                <CandidatesManagement
                    candidates={candidates}
                    onAdd={handleAdd}
                    onEdit={handleEditCandidate}
                    onDelete={handleDeleteCandidate}
                />
            )}
            {activeTab === "profile" && (<UserProfile/>)}
            {editModalData && (
                <EditModal
                    type={editModalData.type}
                    data={editModalData.data}
                    onClose={handleCloseModal}
                    onSuccess={refreshData} // Обновить данные после успешного редактирования
                    nonEditableFields={nonEditableFieldsByTab[activeTab]}
                />
            )}
            {isAddModalOpen && (
                <AddModal
                    type={activeTab}
                    onClose={handleCloseAddModal}
                    onSuccess={refreshData}
                    availableUserIds={availableUserIds}
                    availableVacancyIds={availableVacancyIds}
                />
            )}
        </div>
    );
}

export default HRDashboard;
