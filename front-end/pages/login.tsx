import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const users = [
  { name: 'John Doe', email: 'john.doe@test.com', password: 'password123', role: 'parent' },
  { name: 'Jane Smith', email: 'jane.smith@test.com', password: 'password456', role: 'child' },
  { name: 'Bobby Smith', email: 'bobby.smith@test.com', password: 'password789', role: 'child' },
  { name: 'Alice Johnson', email: 'alice.johnson@test.com', password: 'password234', role: 'child'},
  { name: 'Admin', email: 'admin@test.com', password: 'password111', role: 'admin'},
];

const Login = () => {
  return (
    <div>
      <Header />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Table</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Password</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.password}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LoginForm />
      

    </div>
  );
};

export default Login;
