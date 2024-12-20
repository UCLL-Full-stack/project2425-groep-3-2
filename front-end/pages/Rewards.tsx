import React, { useState, useEffect } from 'react';
import RewardsOverview from '../components/RewardsOverview';
import Header from '../components/Header';
import rewardService from '../service/rewardService';

const RewardsPage: React.FC = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const fetchedRewards = await rewardService.getAllRewards();
        setRewards(fetchedRewards);
      } catch (error) {
        setError('Error fetching rewards');
        console.error('Error fetching rewards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <RewardsOverview rewards={rewards} />
    </div>
  );
};

export default RewardsPage;
