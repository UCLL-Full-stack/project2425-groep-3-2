import React, { useEffect, useState } from 'react';
import userService from '../service/userService';
import choreService from '../service/choreService'; 
import { User, Chore } from '../types';

const ChildList: React.FC = () => {
    const [children, setChildren] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chores, setChores] = useState<Record<number, Chore[]>>({});

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const users: User[] = await userService.getAllUsers();
                const childUsers = users.filter(user => user.role === 'child');
                setChildren(childUsers);
                await fetchChoresForChildren();
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChildren();
    }, []);

    const fetchChoresForChildren = async () => {
        try {
            const users: User[] = await userService.getAllUsers();
            const childUsers = users.filter(user => user.role === 'child');

            const choresByUserId: Record<number, Chore[]> = {};
            for (const child of childUsers) {
                try {
                    const userChores = await choreService.getChoresByUserId(child.id); 
                    choresByUserId[child.id] = userChores; 
                } catch (err) {
                    console.error(`Failed to fetch chores for user ${child.name}:`, err);
                }
            }

            setChores(choresByUserId);
        } catch (err) {
            console.error('Failed to fetch children for chores:', err);
        }
    };

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Children List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.length > 0 ? (
                    children.map(child => (
                        <div key={child.id} className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-semibold">{child.name}</h2>
                            <p className="text-gray-600"><strong>Email:</strong> {child.email}</p>
                            
                            {chores[child.id] && chores[child.id].length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Chores:</h3>
                                    <ul className="list-disc list-inside">
                                        {chores[child.id].map(chore => (
                                            <li key={chore.id} className="text-gray-700">
                                                <strong>{chore.title}</strong>: {chore.description} (Points: {chore.points})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">No children found.</p>
                )}
            </div>
        </div>
    );
};

export default ChildList;
