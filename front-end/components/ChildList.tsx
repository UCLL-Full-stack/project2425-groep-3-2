import React, { useEffect, useState } from 'react';
import userService from '../service/userService';
import { User } from '../types';

const ChildList: React.FC = () => {
    const [children, setChildren] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const users: User[] = await userService.getAllUsers();
                const childUsers = users.filter(user => user.role === 'child');
                setChildren(childUsers);
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChildren();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Child List</h2>
            <ul>
                {children.length > 0 ? (
                    children.map(child => (
                        <li key={child.id}>
                            <strong>Name:</strong> {child.name}<br />
                            <strong>Email:</strong> {child.email}
                        </li>
                    ))
                ) : (
                    <p>No children found.</p>
                )}
            </ul>
        </div>
    );
};

export default ChildList;
