import React, {useState} from "react";
import VacationRequest from "./VacationRequest";
import UserProfile from "./UserProfile";

function EmployeeDashboard() {
    const [activeEmployeeTab, setActiveEmployeeTab] = useState("vacation");

    const handleTabClick = (tab) => {
        setActiveEmployeeTab(tab);
    };

    return (
        <div>
            <div className="border-b border-gray-300 mb-4">
                <div className="flex space-x-4">
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeEmployeeTab === "vacation"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("vacation")}
                    >
                        Отпуск
                    </button>
                    <button
                        className={`py-2 px-4 border-b-2 ${
                            activeEmployeeTab === "profile"
                                ? "border-blue-500 text-blue-500 font-semibold"
                                : "border-transparent text-gray-600 hover:text-blue-500"
                        }`}
                        onClick={() => handleTabClick("profile")}
                    >
                        Профиль
                    </button>

                </div>
            </div>

            {activeEmployeeTab === "vacation" && <VacationRequest/>}
            {activeEmployeeTab === "profile" && <UserProfile canEdit={false}/>}
        </div>
    );
}

export default EmployeeDashboard;
