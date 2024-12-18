import { PrismaClient, Notification, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async (
  userId: number,
  message: string,
  type: NotificationType,
  extraData?: any,
  rewardId?: number
): Promise<Notification> => { 
  try {
      const notification = await prisma.notification.create({
          data: {
              userId,
              message,
              type,
              extraData: extraData ? JSON.stringify(extraData) : null,
              rewardId: rewardId || null,
          },
      });

      console.log('Notification created:', notification);
      return notification; 
  } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
  }
};


export const getNotificationsByUser = async (userId: number): Promise<Notification[]> => {
  try {
    return await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching notifications by user:', error);
    throw new Error('Failed to fetch notifications by user');
  }
};

export const getAllNotifications = async (): Promise<Notification[]> => {
  try {
    return await prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    throw new Error('Failed to fetch all notifications');
  }
};

export const getUnreadNotifications = async (userId: number): Promise<Notification[]> => {
  try {
    return await prisma.notification.findMany({
      where: {
        userId,
        read: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    throw new Error('Failed to fetch unread notifications');
  }
};

export const markNotificationAsRead = async (notificationId: number): Promise<Notification> => {
  try {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Failed to mark notification as read');
  }
};
