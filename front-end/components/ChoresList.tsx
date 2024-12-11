import React from 'react';
import { Chore } from '../types';

interface ChoreListProps {
    chores: Chore[];
    onChoreClick: (chore: Chore) => void;
}

const ChoresList: React.FC<ChoreListProps> = ({ chores, onChoreClick }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Chore List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chores.length > 0 ? (
                    chores.map(chore => (
                        <div
                            key={chore.id}
                            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                            onClick={() => onChoreClick(chore)}
                        >
                            <h2 className="text-xl font-semibold">{chore.title}</h2>
                            <p className="text-gray-600"><strong>Description:</strong> {chore.description}</p>
                            <p className="text-gray-600"><strong>Points:</strong> {chore.points}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">No chores found.</p>
                )}
            </div>
        </div>
    );
};

export default ChoresList;
