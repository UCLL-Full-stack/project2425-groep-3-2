import React from 'react';
import RewardsOverview from '../components/RewardsOverview'; 
import Header from '../components/Header'; 

const RewardsPage: React.FC = () => {
    return (
        <div>
            <Header /> 
            <h1>Available Rewards</h1> 
            
          
            <RewardsOverview />
        </div>
    );
};

export default RewardsPage;
