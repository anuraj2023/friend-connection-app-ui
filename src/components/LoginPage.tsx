import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from './shadcn/components/ui/button';
import { Input } from './shadcn/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from './shadcn/components/ui/card';
import { login } from '../store/authSlice';
import SignupModal from './SignupModal';
import { loginUser } from '../services/api';
import { Toaster } from './shadcn/components/ui/toaster';
import { useToast } from './shadcn/components/ui/use-toast';
import { User } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Import the logo
import logo from '../assets/logo.png';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { toast } = useToast();

  // Function to handle login
  const handleLogin = async () => {
    try {
      const user: User = await loginUser(username, password);
      dispatch(login(user));
      history.push('/home');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.detail || 'Login failed',
        duration: 1000,
      });
      console.error('Login failed:', error);
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    toast({
      variant: "destructive",
      title: "Not implemented",
      description: "The forgot password functionality is not implemented yet.",
      duration: 2000,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Friend Connection Logo" className="mx-auto mb-4 h-20 w-auto" />
          <h1 className="text-3xl font-bold mb-2">Friend Connection</h1>
          <p className="text-gray-600 mb-6">Connecting People</p>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <div className="relative mb-4">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
          </div>
          <div className="text-right mb-4">
            <Button variant="link" onClick={handleForgotPassword}>
              Forgot Password?
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">Sign in</Button>
        </CardFooter>
        <div className="text-center mt-4 mb-6">
          <Button variant="link" onClick={() => setIsSignupModalOpen(true)}>
            Sign up
          </Button>
        </div>
      </Card>
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <Toaster />
    </div>
  );
};

export default LoginPage;
