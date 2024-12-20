import choreService from '../service/chore.service'; 
import choreRepository from '../repository/chore.db'; 
import { ChoreStatus, ChoreInput, ChoreAssignmentInput } from '../types'; 

jest.mock('../repository/chore.db');

describe('Chore Service', () => {
  const mockChore = {
    id: 1,
    title: 'Clean Room',
    description: 'Clean the room thoroughly',
    points: 10,
  };

  const mockAssignment = {
    userId: 1,
    choreId: 1,
    status: 'incomplete',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllChores', () => {
    it('should return a list of chores with assignments', async () => {
      const mockChores = [
        {
          ...mockChore,
          assignedTo: [{ userId: 1, choreId: 1, status: 'incomplete' }],
        },
      ];

      (choreRepository.getAllChores as jest.Mock).mockResolvedValue(mockChores);

      const chores = await choreService.getAllChores();

      expect(chores).toEqual(mockChores);
      expect(choreRepository.getAllChores).toHaveBeenCalledTimes(1);
    });
  });
  describe('getChoreById', () => {
    it('should return a chore by its ID', async () => {
      (choreRepository.getChoreById as jest.Mock).mockResolvedValue(mockChore);

      const chore = await choreService.getChoreById(1);

      expect(chore).toEqual(mockChore);
      expect(choreRepository.getChoreById).toHaveBeenCalledWith(1);
    });

    it('should return null if the chore does not exist', async () => {
      (choreRepository.getChoreById as jest.Mock).mockResolvedValue(null);

      const chore = await choreService.getChoreById(999);

      expect(chore).toBeNull();
    });
  });

  describe('addChore', () => {
    it('should add a new chore', async () => {
      const newChore = { ...mockChore, id: 2 };
      (choreRepository.addChore as jest.Mock).mockResolvedValue(newChore);

      const chore = await choreService.addChore('Mow Lawn', 'Mow the front yard', 15);

      expect(chore).toEqual(newChore);
      expect(choreRepository.addChore).toHaveBeenCalledWith('Mow Lawn', 'Mow the front yard', 15);
    });
  });

  describe('assignChoreToUser', () => {
    it('should assign a chore to a user', async () => {
      const mockAssignmentResult = { ...mockAssignment, status: 'incomplete' };
      (choreRepository.assignChoreToUser as jest.Mock).mockResolvedValue(mockAssignmentResult);

      const assignment = await choreService.assignChoreToUser(1, 1, 'incomplete');

      expect(assignment).toEqual(mockAssignmentResult);
      expect(choreRepository.assignChoreToUser).toHaveBeenCalledWith(1, 1, 'incomplete');
    });
  });

  describe('removeChoreAssignment', () => {
    it('should remove a chore assignment', async () => {

      (choreRepository.removeChoreAssignment as jest.Mock).mockResolvedValue({ count: 1 });
  
      await choreService.removeChoreAssignment(1, 1);
  
      expect(choreRepository.removeChoreAssignment).toHaveBeenCalledWith(1, 1);
    });
  
    it('should throw an error if no assignment was found to remove', async () => {

      (choreRepository.removeChoreAssignment as jest.Mock).mockResolvedValue({ count: 0 });

      await expect(choreService.removeChoreAssignment(1, 1)).rejects.toThrowError('No assignment found to remove');
    });
  });

  describe('updateChoreAssignmentStatus', () => {
    it('should update the status of a chore assignment', async () => {
        const mockUpdatedAssignment = { ...mockAssignment, status: 'completed' };
        
        (choreRepository.getChoreAssignmentById as jest.Mock).mockResolvedValue(mockAssignment);
        (choreRepository.getChoreById as jest.Mock).mockResolvedValue(mockChore);
        (choreRepository.updateChoreAssignmentStatus as jest.Mock).mockResolvedValue(mockUpdatedAssignment);
      
 
        const assignment = await choreService.updateChoreAssignmentStatus(1, 'completed');
      
  
        expect(assignment.status).toBe('completed');
        expect(choreRepository.updateChoreAssignmentStatus).toHaveBeenCalledWith(1, 'completed');
      });

    it('should throw an error if the chore assignment is not found', async () => {
      (choreRepository.getChoreAssignmentById as jest.Mock).mockResolvedValue(null);

      await expect(choreService.updateChoreAssignmentStatus(999, 'completed')).rejects.toThrowError('Chore assignment not found');
    });

    it('should add points to user wallet when a chore is marked as completed', async () => {
      const mockUpdatedAssignment = { ...mockAssignment, status: 'completed' };
      (choreRepository.getChoreAssignmentById as jest.Mock).mockResolvedValue(mockAssignment);
      (choreRepository.updateChoreAssignmentStatus as jest.Mock).mockResolvedValue(mockUpdatedAssignment);
      const mockUpdateWallet = jest.fn();
      (choreRepository.updateUserWallet as jest.Mock).mockImplementation(mockUpdateWallet);

      await choreService.updateChoreAssignmentStatus(1, 'completed');

      expect(mockUpdateWallet).toHaveBeenCalledWith(1, 10); 
    });
  });

  describe('addPointsToUserWallet', () => {
    it('should add points to a user\'s wallet', async () => {
      const mockChore = { id: 1, points: 10 };
      (choreRepository.getChoreById as jest.Mock).mockResolvedValue(mockChore);
      const mockUpdateWallet = jest.fn();
      (choreRepository.updateUserWallet as jest.Mock).mockImplementation(mockUpdateWallet);

      await choreService.addPointsToUserWallet(1, 1);

      expect(mockUpdateWallet).toHaveBeenCalledWith(1, 10);
    });

    it('should throw an error if the chore is not found', async () => {
      (choreRepository.getChoreById as jest.Mock).mockResolvedValue(null);

      await expect(choreService.addPointsToUserWallet(1, 1)).rejects.toThrowError('Chore not found');
    });
  });
});
