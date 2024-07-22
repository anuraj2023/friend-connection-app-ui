import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
import { Button } from './shadcn/components/ui/button';
import { Input } from './shadcn/components/ui/input';
import { useToast } from './shadcn/components/ui/use-toast';
import { signup } from '../services/api';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignupFormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const initialSignupState: SignupFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
};

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [signupState, setSignupState] = useState<SignupFormState>(initialSignupState);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSignupState(initialSignupState);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      await signup(signupState.firstName, signupState.lastName, signupState.username, signupState.email, signupState.password);
      toast({
        title: "Success",
        description: "Signup successful! Please log in to proceed.",
        duration: 2000,
        className: 'bg-green-500 text-white'
      });
      setTimeout(onClose, 1000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        duration: 2000,
        description: 'Signup failed: ' + (error.response?.data?.detail || error.message),
      });
      console.error('Signup failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={signupState.firstName}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={signupState.lastName}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={signupState.username}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={signupState.email}
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={signupState.password}
          onChange={handleInputChange}
          className="mb-4"
        />
        <DialogFooter>
          <Button onClick={handleSignup}>Sign Up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
