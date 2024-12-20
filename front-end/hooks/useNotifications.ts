import { useEffect, useState } from 'react';
import notificationService from '../service/notificationService';
import { Notification } from '../types'; 

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentNotificationId, setCurrentNotificationId] = useState<number | null>(null);


  const fetchAllNotifications = async () => {
    try {
      const response = await notificationService.getAllNotifications();
      setNotifications(response); 
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  const fetchUnreadNotifications = async () => {
    try {
   
      const allNotifications: Notification[] = await notificationService.getAllNotifications();


      const latestUnreadNotification = allNotifications
        .filter((notification) => !notification.read)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]; 

      if (latestUnreadNotification) {
        showPopup(latestUnreadNotification); 
      } else {
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
    }
  };
  const showPopup = (notification: Notification) => {
    setNotificationMessage(notification.message);
    setCurrentNotificationId(notification.id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    if (currentNotificationId !== null) {
      notificationService
        .markNotificationAsRead(currentNotificationId)
        .then(() => {
          console.log(`Notification ${currentNotificationId} marked as read.`);
        })
        .catch((error: any) => {
          console.error('Error marking notification as read:', error);
        });
    }
    setModalOpen(false);
    setNotificationMessage('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllNotifications();
      fetchUnreadNotifications(); 
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    isModalOpen,
    notificationMessage,
    showPopup,
    handleCloseModal,
  };
};
