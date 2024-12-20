
import React from 'react';
import { ChoreAssignment } from 'types';
import choreService from '../service/choreService';

interface PendingAssignmentsProps {
  chores: ChoreAssignment[];
  loading: boolean;
  error: string | null;
  onApprove: () => void; 
}

const PendingAssignments: React.FC<PendingAssignmentsProps> = ({ chores, loading, error, onApprove }) => {
  const handleApprove = async (choreAssignmentId: number) => {
    try {
      await choreService.updateChoreAssignmentStatus(choreAssignmentId, 'completed');
      onApprove(); 
    } catch (err) {
      console.error('Failed to approve the chore:', err);
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Chore Assignments</h1>
      {chores.length === 0 ? (
        <p>No pending tasks for children</p>
      ) : (
        <ul className="space-y-4">
          {chores.map((assignment) => {
            const { chore, user } = assignment;

            return (
              <li key={assignment.id} className="border p-4 rounded-md">
                <h2 className="text-xl font-semibold">{chore?.title || 'Chore Title Not Available'}</h2>
                <p>{chore?.description || 'Chore description not available'}</p>
                <p className="text-sm text-gray-500">Points: {chore?.points ?? 'N/A'}</p>
                <p className="text-sm text-gray-700">Assigned to: {user?.name || 'Child Name Not Available'}</p>
                <p className={`text-sm ${assignment.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                  Status: {assignment.status}
                </p>
                {assignment.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(assignment.id)}
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PendingAssignments;
