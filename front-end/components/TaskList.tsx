import React, { useEffect, useState } from 'react';
import choreService from '../service/choreService';
import { ChoreAssignment } from 'types';
import { useRouter } from 'next/router';

const TaskList = () => {
  const [chores, setChores] = useState<ChoreAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchChores = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user || !user.id) {
          setError('User not logged in');
          return;
        }
        const fetchedAssignments = await choreService.getChoreAssignmentsByUserId(user.id);
  
        console.log('Fetched assignments:', fetchedAssignments); // Log data for debugging
  
        setChores(fetchedAssignments); // Set assignments directly
      } catch (err) {
        setError('Failed to fetch chore assignments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchChores();
  }, []);

  const handleMarkAsComplete = async (choreAssignmentId: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
        try {
            await choreService.updateChoreAssignmentStatus(choreAssignmentId, 'pending');

            const updatedChores = await choreService.getChoreAssignmentsByUserId(user.id);
            setChores(updatedChores);
            router.push('/TaskOverview');
        } catch (err) {
            console.error('Failed to mark chore as completed', err);
        }
    }
};
  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Chores</h1>
      {chores.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-4">
  {chores.map((assignment) => {
    const { chore } = assignment;

    return (
      <li key={assignment.id} className="border p-4 rounded-md">
        <h2 className="text-xl font-semibold">{chore?.title || 'Chore Title Not Available'}</h2>
        <p>{chore?.description || 'Chore description not available'}</p>
        <p className="text-sm text-gray-500">Points: {chore?.points ?? 'N/A'}</p>
        <p className={`text-sm ${assignment.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
          Status: {assignment.status}
        </p>
        <div className="flex justify-end">
          {assignment.status === 'incomplete' && (
            <button
              onClick={() => handleMarkAsComplete(assignment.id)}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </li>
    );
  })}
</ul>

      )}
    </div>
  );
};

export default TaskList;
