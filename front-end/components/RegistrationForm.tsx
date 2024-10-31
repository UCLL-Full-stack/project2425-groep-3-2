import React, { useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../service/userService';

const RegistrationForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'parent' | 'child'>('child');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        try {
            const newUser = await userService.createUser({
                name,
                email,
                password,
                role,
            });
            setSuccess(`User ${newUser.name} created successfully!`);

           
            router.push('/login'); 

            
            setName('');
            setEmail('');
            setPassword('');
            setRole('child');
        } catch (err) {
            setError('Failed to create user. Please try again.');
            console.error(err);
        }
    };
    
    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value as 'parent' | 'child')} required>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegistrationForm;
