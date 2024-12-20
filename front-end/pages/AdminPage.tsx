import React, { useEffect, useState } from 'react';
import userService from '../service/userService';
import AdminOverview from '../components/AdminOverview';
import Header from '@components/Header';

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await userService.deleteUserById(userId); 

     
      const updatedUsers = await userService.getAllUsers();
      setUsers(updatedUsers); 

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      <AdminOverview users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default AdminPage;
