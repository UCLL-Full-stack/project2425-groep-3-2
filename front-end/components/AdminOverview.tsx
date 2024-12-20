import React, { useState } from 'react';
import Modal from './Modal';  
import userService from '../service/userService';

interface AdminOverviewProps {
  users: any[];
  onDeleteUser: (userId: string) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ users, onDeleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleOpenModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await onDeleteUser(selectedUserId); 
        handleCloseModal(); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>{user.email}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenModal(user.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && selectedUserId && (
        <Modal onClose={handleCloseModal}>
          <div>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
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

export default AdminOverview;
