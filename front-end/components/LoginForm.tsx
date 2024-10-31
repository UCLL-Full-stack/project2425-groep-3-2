import { useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../service/userService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await userService.login(email, password);
            if (response) {
                const userRole = response.user.role; 
                if (userRole === 'parent') {
                    router.push('/ChildrenOverview');
                } else if (userRole === 'child') {
                    router.push('/TaskOverview'); 
                }
                console.log('Login successful');
            }
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
