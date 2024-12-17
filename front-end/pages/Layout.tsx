// Layout.tsx or Dashboard.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';  // Import the Header component
import userService from '../service/userService';  // Your userService to fetch user data

const Layout = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user?.role || null);
    if (user?.role === 'child' && user?.id) {
      fetchUserById(user.id.toString());
    }
  }, []);

  const fetchUserById = async (userId: string) => {
    try {
      const response = await userService.getUserById(userId);
      console.log('Fetched user data:', response);
      if (response && response.wallet !== undefined) {
        setUserPoints(response.wallet);
      } else {
        console.error('No wallet data in user response', response);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserRole(null);
    setUserPoints(null);
    window.location.href = '/login';  // Redirecting manually for the logout
  };

  return (
    <div>
      <Header
        userRole={userRole}
        userPoints={userPoints}
        onLogout={handleLogout}
      />
      {/* Other content of the page goes here */}
    </div>
  );
};

export default Layout;
