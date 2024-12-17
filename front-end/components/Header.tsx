import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import userService from '../service/userService';

const Header = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userPoints, setUserPoints] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setUserRole(user?.role || null);
        if (user?.role === 'child' && user?.id) {
            fetchUserById(user.id.toString());
        }
    }, []);

    const fetchUserById = async (userId: string) => {
        try {
            const response = await userService.getUserById(userId);
            console.log('Fetched user data:', response);

           
            if (response && response.wallet !== undefined) {
                setUserPoints(response.wallet);
            } else {
                console.error('No wallet data in user response', response);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserRole(null);
        setUserPoints(null);
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">Family chore manager</h1>
                <nav>
                    {userRole === 'parent' && (
                        <>
                            <button
                                onClick={() => router.push('/PendingAssignments')}
                                className="mr-4 text-white hover:text-gray-300"
                            >
                            Awaiting approval
                            </button>
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
                        <div className="flex items-center">
                            <button
                                onClick={() => router.push('/TaskOverview')}
                                className="mr-4 text-white hover:text-gray-300"
                            >
                                Task Overview
                            </button>
                            {userPoints !== null ? (
                                <span className="text-white">Points: {userPoints}</span>
                            ) : (
                                <span className="text-white">Loading Points...</span>
                            )}
                        </div>
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
