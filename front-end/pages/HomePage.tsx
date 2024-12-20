import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useNotifications } from '../hooks/useNotifications';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    notifications,
    isModalOpen,
    notificationMessage,
    handleCloseModal,
  } = useNotifications();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{t('wwelcome')}</h2>
          <p className="text-lg text-gray-600 mb-4">{t('ddescription')}</p>
        </div>
      </div>
      {notificationMessage && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          contentLabel="New Notification"
        >
          <p>{notificationMessage}</p>
        </Modal>
      )}
    </div>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        }
    }
  };

export default HomePage;
