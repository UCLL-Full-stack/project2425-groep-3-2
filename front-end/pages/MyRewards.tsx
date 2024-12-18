import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import MyRewardsOverview from '@components/MyRewardsOverview';
import rewardService from '../service/rewardService';

const MyRewardsPage: React.FC = () => {
  const router = useRouter();
  const [rewards, setRewards] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'child') {
      router.push('/login'); 
      return;
    }

    const fetchRewards = async () => {
      try {
        setLoading(true);
        const fetchedRewards = await rewardService.getRewardsByUser(user.id);

        if (Array.isArray(fetchedRewards)) {
          setRewards(fetchedRewards);
        } else {
          setRewards([]); 
        }
      } catch (err) {
        setError('Failed to fetch rewards');
        console.error(err);
        setRewards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [router]);

  const handleDeleteReward = async (rewardId: number) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user || !user.id) {
        setError('User not logged in');
        return;
      }

      await rewardService.deleteReward(rewardId, user.id);
      setRewards((prevRewards) => prevRewards.filter((reward) => reward.id !== rewardId)); 
      alert('Reward deleted successfully!');
    } catch (err) {
      setError('Failed to delete reward');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      {rewards.length === 0 ? (
        <p className="text-center text-lg font-semibold">Buy some rewards first</p> 
      ) : (
        <MyRewardsOverview rewards={rewards} onDeleteReward={handleDeleteReward} />
      )}
    </div>
  );
};

export default MyRewardsPage;
