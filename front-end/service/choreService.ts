const getAllChores = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const getChoreById = (choreId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};
const removeChoreAssignment = (userId: number, choreId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/remove-assignment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, choreId }),
    }).then(response => response.json());
};
const createChore = (chore: { title: string; description: string; points: number }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chore),
    }).then(response => response.json());
};

const assignChoreToUser = (userId: number, choreId: number, status: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, choreId, status }),
    }).then(response => response.json());
};

const deleteChoreById = (choreId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const getChoresByUserId = (userId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const updateChore = (choreId: number, updates: { title?: string; description?: string; points?: number }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    }).then(response => response.json());
};

const choreService = {
    getAllChores,
    getChoreById,
    createChore,
    assignChoreToUser,
    deleteChoreById,
    getChoresByUserId,
    updateChore,
    removeChoreAssignment,
};

export default choreService;
