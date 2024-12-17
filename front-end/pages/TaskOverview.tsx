import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import TaskList from '@components/TaskList';

const TaskOverview = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'child') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <Header />
      <TaskList />
    </div>
  );
};

export default TaskOverview;
