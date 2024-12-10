import React from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const HomePage: React.FC = () => {
    const router = useRouter();

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome to My App</h2>
                    <p className="text-lg text-gray-600 mb-4">Manage your tasks and children’s chores with ease.</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push('/register')}
                        className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200 mt-4"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
