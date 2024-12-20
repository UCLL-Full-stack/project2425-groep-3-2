import React, { useEffect, useState } from 'react';
import ChildList from '../components/ChildList';
import userService from '../service/userService';
import choreService from '../service/choreService';
import { User, Chore } from '../types';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useNotifications } from '../hooks/useNotifications';
import Modal from '@components/Modal';
const ChildrenOverview = () => {
  const [children, setChildren] = useState<User[]>([]);
  const [chores, setChores] = useState<Record<number, Chore[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    notifications,
    isModalOpen,
    notificationMessage,
    handleCloseModal,
  } = useNotifications();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'parent') {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users: User[] = await userService.getAllUsers();
        const childUsers = users.filter(user => user.role === 'child');
        setChildren(childUsers);

        const choresByUserId: Record<number, Chore[]> = {};
        for (const child of childUsers) {
          try {
            const userChores = await choreService.getChoresByUserId(child.id);
            choresByUserId[child.id] = userChores;
          } catch (err) {
            console.error(`Failed to fetch chores for child ${child.name}:`, err);
          }
        }

        setChores(choresByUserId);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      <ChildList children={children} chores={chores} />
      {notificationMessage && (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} contentLabel="New Notification">
        <p>{notificationMessage}</p>
      </Modal>
      )}
    </div>
  );
};

export default ChildrenOverview;
