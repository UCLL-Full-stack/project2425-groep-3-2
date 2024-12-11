import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import userService from '../service/userService';

const Header = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = await userService.getCurrentUser();
                if (user) {
                    setUserRole(user.role);
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
            }
        };

        fetchUserRole();
    }, []);

    const handleLogout = () => {
        userService.logout();
        setUserRole(null);
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">My App</h1>
                <nav>
                    {userRole === 'parent' && (
                        <>
                            <button
                                onClick={() => router.push('/ChildrenOverview')}
                                className="mr-4 text-white hover:text-gray-300"
                            >
                                Children Overview
                            </button>
                            <button
                                onClick={() => router.push('/Chores')}
                                className="mr-4 text-white hover:text-gray-300"
                            >
                                Chores Overview
                            </button>
                        </>
                    )}
                    {userRole === 'child' && (
                        <button
                            onClick={() => router.push('/TaskOverview')}
                            className="mr-4 text-white hover:text-gray-300"
                        >
                            Task Overview
                        </button>
                    )}
                    
                    {userRole && (
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-300"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
