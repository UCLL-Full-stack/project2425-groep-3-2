import React, { useEffect, useState } from 'react';
import choreService from '../service/choreService';
import userService from '../service/userService';
import ChoresList from '../components/ChoresList';
import ChoreDetail from '../components/ChoreDetail';
import { ChoreAssignment, User, Chore } from '../types';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const ChoresOverview = () => {
  const [chores, setChores] = useState<Chore[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'parent') {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const fetchedChores = await choreService.getAllChores();
        setChores(fetchedChores);
      } catch (err) {
        setError('Failed to fetch chores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers();
        const childUsers = fetchedUsers.filter((user: { role: string; }) => user.role === 'child');
        setUsers(childUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchChores();
    fetchUsers();
  }, []);

  const handleChoreClick = (chore: Chore) => {
    setSelectedChore(chore);
  };

  const closeModal = () => {
    setSelectedChore(null);
  };

  const handleSaveAssignment = async (selectedUsers: User[]) => {
    if (selectedChore) {
      try {
        const assignments: ChoreAssignment[] = selectedUsers.map((user) => ({
          id: Date.now(),
          userId: user.id,
          choreId: selectedChore.id,
          status: 'pending',
          assignedAt: new Date(),
          user: user,
          chore: selectedChore,
        }));

        for (const assignment of assignments) {
          await choreService.assignChoreToUser(assignment.userId, assignment.choreId, assignment.status);
        }

        const updatedChores = await choreService.getAllChores();
        setChores(updatedChores);

        setSelectedChore({
          ...selectedChore,
          assignedTo: [...selectedChore.assignedTo, ...assignments],
        });
      } catch (err) {
        console.error('Failed to assign users:', err);
      }
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      <ChoresList chores={chores} onChoreClick={handleChoreClick} />

      {selectedChore && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>

            <ChoreDetail
              chore={selectedChore}
              onSaveAssignment={handleSaveAssignment}
              allUsers={users}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoresOverview;
