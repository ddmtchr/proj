import { useState, useCallback } from "react";

let notificationId = 0;

const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type) => {
        const id = notificationId++;
        setNotifications((prev) => [
            ...prev,
            { id, message, type },
        ]);

        setTimeout(() => removeNotification(id), 5000);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return { notifications, addNotification, removeNotification };
};

export default useNotification;
