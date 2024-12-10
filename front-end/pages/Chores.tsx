import React, { useEffect, useState } from 'react';
import ChoresList from './ChoresList';
import './ChoresListComponent.css'; // Import the styles

// Assuming you have a type for Chore
import { Chore } from '../types';

const ChoresPage: React.FC = () => {
    const [chores, setChores] = useState<Chore[]>([]);

    // Fetch chores data on page load
    useEffect(() => {
        const fetchChores = async () => {
            try {
                const response = await fetch('/chores'); 
                const data = await response.json();
                setChores(data);
            } catch (error) {
                console.error('Error fetching chores:', error);
            }
        };

        fetchChores();
    }, []);

    return (
        <div className="chores-page">
            <ChoresList chores={chores} />
        </div>
    );
};

export default ChoresPage;
