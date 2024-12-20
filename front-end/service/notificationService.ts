const getNotificationsByUser = (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const getUnreadNotifications = (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/unread?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};


const markNotificationAsRead = (notificationId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const createNotification = (notification: { userId: number; message: string; type: string; choreId?: number; rewardId?: number }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify(notification),
    }).then(response => response.json());
};

const getAllNotifications = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const notificationService = {
    getNotificationsByUser,
    getUnreadNotifications,
    markNotificationAsRead,
    createNotification,
    getAllNotifications,
};

export default notificationService;
