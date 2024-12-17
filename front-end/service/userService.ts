
    const getAllUsers = () => {
         const token = localStorage.getItem('token');
         if (!token) {
             throw new Error('No token found');
           }
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(response => response.json());
    };

    const getUserById = (userId: string) => {
        const token = localStorage.getItem('token');
         if (!token) {
             throw new Error('No token found');
           }
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(response => response.json());
    };

    const createUser = (user: { name: string; email: string; role: string, password:string }) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(response => response.json());
    };

    const deleteUserById = (userId: string) => {
        const token = localStorage.getItem('token');
         if (!token) {
             throw new Error('No token found');
           }
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(response => response.json());
    };

    const updateUser = (userId: string, updatedData: { name?: string; email?: string; role?: string }) => {
        const token = localStorage.getItem('token');
         if (!token) {
             throw new Error('No token found');
           }
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify(updatedData),
        }).then(response => response.json());
    };
    const getCurrentUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user); 
        }
        return null;
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
    const logout = () => {
        localStorage.removeItem('user'); 
        return fetch('/api/logout', {
            method: 'POST',
        });
    };
    const userService = {
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUserById,
        login,
        getCurrentUser,
        logout,

    };

    export default userService;