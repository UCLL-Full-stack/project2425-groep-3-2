
import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import PendingAssignments from '../components/PendingAssignments';
import choreService from '../service/choreService';
import { ChoreAssignment } from 'types';

const ParentDashboard = () => {
  const [chores, setChores] = useState<ChoreAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingChores = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user || user.role !== 'parent') {
        setError('Only parents can view this page');
        return;
      }

      const fetchedAssignments: ChoreAssignment[] = await choreService.getChoreAssignmentsForChildren();
      const pendingAssignments = fetchedAssignments.filter(
        (assignment) => assignment.status === 'pending'
      );

      console.log('Fetched pending assignments:', pendingAssignments);
      setChores(pendingAssignments);
    } catch (err) {
      setError('Failed to fetch chore assignments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingChores();
  }, []);

  const handleApprove = async () => {
    setLoading(true); 
    await fetchPendingChores();
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>
      <PendingAssignments chores={chores} loading={loading} error={error} onApprove={handleApprove} />
    </div>
  );
};

export default ParentDashboard;
