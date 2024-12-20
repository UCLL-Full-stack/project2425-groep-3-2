import React, { useEffect, useState } from 'react';
import { Reward } from '../types';
import Modal from './Modal'; 
import rewardService from 'service/rewardService';

interface RewardsOverviewProps {
  rewards: Reward[];
}

const RewardsOverview: React.FC<RewardsOverviewProps> = ({ rewards }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const handleClaimReward = (reward: Reward) => {
    setSelectedReward(reward);
    setShowModal(true); 
  };

  const cancelRedeem = () => {
    setShowModal(false);
  };

  const confirmRedeem = async () => {
    if (!selectedReward || !currentUserId) return;

    try {
      const response = await rewardService.redeemReward(selectedReward.id, currentUserId);

      if (response && response.success) {
        alert('You have successfully claimed the reward!');
      } else {
        alert(response?.message || 'Failed to redeem the reward. Please try again.');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('An error occurred while redeeming the reward.');
    }

    setShowModal(false);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setCurrentUserId(user.id);
    } else {
      console.error("User data is missing in localStorage");
    }
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rewards-overview max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Available Rewards</h2>
      <ul className="rewards-list grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <li key={reward.id} className="reward-item border p-4 rounded-md shadow-md hover:shadow-lg transition">
            <div className="reward-info mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{reward.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{reward.description}</p>
              <p className="text-lg font-bold mt-4">{reward.points} points</p>
            </div>
            <button
              onClick={() => handleClaimReward(reward)}
              className="claim-button bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
            >
              Claim
            </button>
          </li>
        ))}
      </ul>

      {showModal && selectedReward && (
        <Modal onClose={cancelRedeem}>
          <div className="modal-content p-6">
            <h3 className="text-2xl font-semibold mb-4">Are you sure you want to buy the reward?</h3>
            <p className="text-lg text-gray-700 mb-4">{selectedReward?.title}</p>
            <p className="text-sm text-gray-600">{selectedReward?.description}</p>
            <div className="modal-actions mt-6 flex justify-between">
              <button
                onClick={cancelRedeem}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Yes, Buy
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RewardsOverview;
