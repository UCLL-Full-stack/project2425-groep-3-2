
const getAllChores = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores`, {
        
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
        },
    }).then(response => response.json());
};
const getChoreAssignmentsForChildren = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error('No token found');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/assignments/children`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch assignments for children');
  }

  return response.json();
};
const getChoreById = (choreId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};
const removeChoreAssignment = (userId: number, choreId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/remove-assignment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userId, choreId }),
    }).then(response => response.json());
};
const createChore = (chore: { title: string; description: string; points: number }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify(chore),
    }).then(response => response.json());
};

const assignChoreToUser = (userId: number, choreId: number, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify({ userId, choreId, status }),
    }).then(response => response.json());
};
const updateChoreAssignmentStatus = (choreAssignmentId: number, status: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error('No token found');
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/assignment/${choreAssignmentId}/status`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
      },
      body: JSON.stringify({ status }), 
  }).then(response => {
      if (!response.ok) {
          throw new Error(`Failed to update chore status: ${response.statusText}`);
      }
      return response.json();
  });
};

const deleteChoreById = (choreId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    }).then(response => response.json());
};

const getChoresByUserId = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch chores');
    }
  
    return response.json();
  };

const updateChore = (choreId: number, updates: { title?: string; description?: string; points?: number }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
      }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/${choreId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify(updates),
    }).then(response => response.json());
};
const getChoreAssignmentsByUserId = async (userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chores/assignments/user/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch chore assignments');
  }

  return response.json();
};
const choreService = {
    getAllChores,
    getChoreById,
    createChore,
    assignChoreToUser,
    deleteChoreById,
    getChoresByUserId,
    updateChore,
    removeChoreAssignment,
    updateChoreAssignmentStatus,
    getChoreAssignmentsByUserId,
    getChoreAssignmentsForChildren,
};

export default choreService;
