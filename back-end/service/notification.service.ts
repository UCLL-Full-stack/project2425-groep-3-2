import { NotificationInput, NotificationType } from '../types';
import * as notificationRepository from '../repository/notification.db'; 

const createNotification = async (
  userId: number,
  message: string,
  type: NotificationType,
  choreId?: number,
  rewardId?: number,
  extraData?: any,
): Promise<NotificationInput > => {
  return await notificationRepository.createNotification(userId, message, type, choreId, rewardId);
};

const getNotificationsByUser = async (userId: number): Promise<NotificationInput[]> => {
  return await notificationRepository.getNotificationsByUser(userId);
};

const getAllNotifications = async (): Promise<NotificationInput[]> => {
  return await notificationRepository.getAllNotifications();
};

const markNotificationAsRead = async (notificationId: number): Promise<NotificationInput> => {
  return await notificationRepository.markNotificationAsRead(notificationId);
};

const getUnreadNotifications = async (userId: number): Promise<NotificationInput[]> => {
  return await notificationRepository.getUnreadNotifications(userId);
};
export default {
createNotification,
getAllNotifications,
getUnreadNotifications,
markNotificationAsRead,
getNotificationsByUser,
};