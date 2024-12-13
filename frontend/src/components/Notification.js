import React, { useState, useEffect } from "react";

const Notification = ({ notifications, removeNotification }) => {
    return (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 rounded shadow-lg ${
                        notification.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <span>{notification.message}</span>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-4 text-lg font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
