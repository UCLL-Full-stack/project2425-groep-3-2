import React, { useState } from 'react';
import Modal from './Modal';

interface MyRewardsOverviewProps {
  rewards: any[];
  onDeleteReward: (rewardId: number) => void;
}
const MyRewardsOverview: React.FC<MyRewardsOverviewProps> = ({ rewards, onDeleteReward }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedReward, setSelectedReward] = useState<any | null>(null);
  
    const handleUseReward = (reward: any) => {
      setSelectedReward(reward);
      setIsModalOpen(true); 
    };
    const handleCloseModal = () => {
      setIsModalOpen(false); 
      setSelectedReward(null); 
    };
  
    const handleUseNow = () => {
      if (selectedReward) {
        onDeleteReward(selectedReward.id); 
        setIsModalOpen(false);
        setSelectedReward(null);
      }
    };
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">My Rewards</h1>
        {rewards.length === 0 ? (
          <p>No rewards redeemed yet.</p>
        ) : (
          <ul className="space-y-4">
            {rewards.map((reward) => (
              <li key={reward.id} className="border p-4 rounded-md">
                <h2 className="text-xl font-semibold">{reward.title}</h2>
                <p>{reward.description}</p>
                <p className="text-sm text-gray-500">Points: {reward.points}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleUseReward(reward)}
                    className="mt-2 text-blue-500 hover:text-blue-700"
                  >
                    Use
                  </button>
                  <button
                    onClick={() => onDeleteReward(reward.id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
  
        {isModalOpen && selectedReward && (
          <Modal onClose={handleCloseModal}>
            <div>
              <p>
                To use this reward, show this screen to your parents and let them click "Use right now".
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleUseNow}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Use right now
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  };

export default MyRewardsOverview;
