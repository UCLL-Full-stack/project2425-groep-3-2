import React from 'react';
import { Chore } from '../types';


interface ChoresListProps {
    chores: Chore[];
}

const ChoresList: React.FC<ChoresListProps> = ({ chores }) => {
    return (
        <div className="chores-list">
            <h2 className="chores-list-title">Chores</h2>
            <ul className="chores-list-ul">
                {chores.map((chore) => (
                    <li key={chore.id} className="chores-list-item">
                        <div className="chore-title">{chore.title}</div>
                        <div className="chore-description">{chore.description}</div>
                        <div className="chore-points">Points: {chore.points}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoresList;
