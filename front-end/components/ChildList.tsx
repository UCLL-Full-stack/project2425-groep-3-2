import React from 'react';
import { User, Chore } from '../types';

interface ChildListProps {
    children: User[];
    chores: Record<number, Chore[]>;
}

const ChildList: React.FC<ChildListProps> = ({ children, chores }) => {
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
