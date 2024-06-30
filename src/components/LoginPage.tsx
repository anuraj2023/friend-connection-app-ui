import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from './shadcn/components/ui/button';
import { Input } from './shadcn/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter  } from './shadcn/components/ui/card'
import { login } from '../store/authSlice';
import SignupModal from './SignupModal';
import { loginUser } from '../services/api';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      dispatch(login(user));
      history.push('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">Login</Button>
        </CardFooter>
        <div className="text-center mt-4">
          <Button variant="link" onClick={() => setIsSignupModalOpen(true)}>
            Sign up
          </Button>
        </div>
      </Card>
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
};

export default LoginPage;