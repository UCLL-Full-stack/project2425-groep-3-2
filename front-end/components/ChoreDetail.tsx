import React, { useState } from 'react';
import { Chore, User } from '../types';
import choreService from '../service/choreService';

interface ChoreDetailProps {
    chore: Chore;
    onSaveAssignment: (selectedUsers: User[]) => void;
    allUsers: User[];
}

const ChoreDetail: React.FC<ChoreDetailProps> = ({ chore, onSaveAssignment, allUsers }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    const [isRemoveDropdownVisible, setIsRemoveDropdownVisible] = useState<boolean>(false);
    const [UsersToAdd, setUsersToAdd] = useState<User[]>([]);
    const [usersToRemove, setUsersToRemove] = useState<User[]>([]);
    const [selectedChore, setSelectedChore] = useState<Chore>(chore);

    const handleAddUser = (user: User) => {
        setUsersToAdd((prevSelected) => {
            if (prevSelected.includes(user)) {
                return prevSelected.filter((selectedUser) => selectedUser.id !== user.id);
            } else {
                return [...prevSelected, user];
            }
        });
    };

    const handleRemoveUser = (user: User) => {
        setUsersToRemove((prevSelected) => {
            if (prevSelected.includes(user)) {
                return prevSelected.filter((selectedUser) => selectedUser.id !== user.id);
            } else {
                return [...prevSelected, user];
            }
        });
    };

    const handleSaveAssign = async () => {
        await onSaveAssignment(UsersToAdd);
        setIsDropdownVisible(false);
    };

    const handleSaveRemove = async () => {
        try {
            await Promise.all(
                usersToRemove.map((user) => choreService.removeChoreAssignment(user.id, chore.id))
            );
            const updatedAssignedUsers = selectedChore.assignedTo.filter(
                (assignment) => !usersToRemove.some((user) => user.id === assignment.user.id)
            );
            setSelectedChore((prevChore) => ({
                ...prevChore,
                assignedTo: updatedAssignedUsers,
            }));
            const usersToSave = updatedAssignedUsers.map((assignment) => assignment.user);
            await onSaveAssignment(usersToSave);
            setUsersToRemove([]);
            setIsRemoveDropdownVisible(false);
        } catch (error) {
            console.error("Failed to remove selected users", error);
        }
    };
    
    
    

    const assignedUserIds = chore.assignedTo?.map((assignment) => assignment.user.id) || [];
    const unassignedUsers = allUsers.filter((user) => !assignedUserIds.includes(user.id));
    const assignedUsers = allUsers.filter((user) => assignedUserIds.includes(user.id));

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">{chore.title}</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                    <strong>Description:</strong> {chore.description}
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>Points:</strong> {chore.points}
                </p>

                <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
                    <span>Assigned Users</span>
                    <div>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2"
                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        >
                            +
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded-full"
                            onClick={() => setIsRemoveDropdownVisible(!isRemoveDropdownVisible)}
                        >
                            -
                        </button>
                    </div>
                </h3>

                <ul className="list-disc pl-5">
                    {chore.assignedTo && chore.assignedTo.length > 0 ? (
                        chore.assignedTo.map((assignment) => (
                            <li key={assignment.id} className="flex justify-between items-center">
                                <div>
                                    <strong>{assignment.user.name}</strong> - Status: {assignment.status}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No users assigned to this chore yet.</p>
                    )}
                </ul>


                {isDropdownVisible && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Assign Users</h4>
                        <div className="space-y-2">
                            {unassignedUsers.length > 0 ? (
                                unassignedUsers.map((user) => (
                                    <div key={user.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={UsersToAdd.includes(user)}
                                            onChange={() => handleAddUser(user)}
                                            id={`user-${user.id}`}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`user-${user.id}`}>{user.name}</label>
                                    </div>
                                ))
                            ) : (
                                <p>No unassigned users found.</p>
                            )}
                        </div>
                        <button
                            onClick={handleSaveAssign}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
                {isRemoveDropdownVisible && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Remove Users</h4>
                        <div className="space-y-2">
                            {assignedUsers.length > 0 ? (
                                assignedUsers.map((user) => (
                                    <div key={user.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={usersToRemove.includes(user)}
                                            onChange={() => handleRemoveUser(user)}
                                            id={`remove-user-${user.id}`}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`remove-user-${user.id}`}>{user.name}</label>
                                    </div>
                                ))
                            ) : (
                                <p>No assigned users found to remove.</p>
                            )}
                        </div>
                        <button
                            onClick={handleSaveRemove}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChoreDetail;
