const getAllRewards = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const getRewardById = (rewardId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/${rewardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const createReward = (reward: { title: string; description: string; points: number }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify(reward),
    }).then(response => response.json());
};

const redeemReward = (rewardId: number, userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/${rewardId}/redeem?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const getRedeemedUsers = (rewardId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/${rewardId}/redeemed-users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};
const getRewardsByUser = (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/rewards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};
const deleteReward = (rewardId: number, userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards/${rewardId}?userId=${userId}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete reward');
        }
        return response.json();
    });
};
const rewardService = {
    getAllRewards,
    getRewardById,
    createReward,
    redeemReward,
    getRedeemedUsers,
    getRewardsByUser,
    deleteReward,
};

export default rewardService;
