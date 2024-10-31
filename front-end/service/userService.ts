const getAllUsers = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const getUserById = (userId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const createUser = (user: { name: string; email: string; role: string, password:string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(response => response.json());
};

const deleteUserById = (userId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const updateUser = (userId: string, updatedData: { name?: string; email?: string; role?: string }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    }).then(response => response.json());
};

const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json(); 
};

const userService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    login,
};

export default userService;