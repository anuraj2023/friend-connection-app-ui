// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
// import { Button } from './shadcn/components/ui/button';
// import { Input } from './shadcn/components/ui/input';
// import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
// import { signup } from '../services/api';

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface SignupFormState {
//   username: string;
//   email: string;
//   password: string;
//   error: string | null;
//   success: string | null;
// }

// const initialSignupState: SignupFormState = {
//   username: '',
//   email: '',
//   password: '',
//   error: null,
//   success: null,
// };

// const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
//   const [signupState, setSignupState] = useState<SignupFormState>(initialSignupState);

//   useEffect(() => {
//     if (isOpen) {
//       setSignupState(initialSignupState); // Reset state on modal open
//     }
//   }, [isOpen]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSignupState(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async () => {
//     try {
//       await signup(signupState.username, signupState.email, signupState.password);
//       setSignupState({
//         ...signupState,
//         success: 'Signup successful! Please log in to proceed.',
//         error: null,
//       });
//     } catch (error: any) {
//       setSignupState({
//         ...signupState,
//         error: 'Signup failed: ' + (error.response?.data?.detail || error.message),
//         success: null,
//       });
//       console.error('Signup failed:', error);
//     }
//     setTimeout(onClose, 2000);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Sign Up</DialogTitle>
//         </DialogHeader>
//         {signupState.error && (
//           <Alert className="mb-4" variant="destructive" role="alert">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{signupState.error}</AlertDescription>
//           </Alert>
//         )}
//         {signupState.success && (
//           <div className="mb-4" style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px' }}>
//             <AlertTitle>Success</AlertTitle>
//             <AlertDescription>{signupState.success}</AlertDescription>
//           </div>
//         )}
//         <Input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={signupState.username}
//           onChange={handleInputChange}
//           className="mb-4"
//         />
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={signupState.email}
//           onChange={handleInputChange}
//           className="mb-4"
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={signupState.password}
//           onChange={handleInputChange}
//           className="mb-4"
//         />
//         <DialogFooter>
//           <Button onClick={handleSignup}>Sign Up</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SignupModal;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
import { Button } from './shadcn/components/ui/button';
import { Input } from './shadcn/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
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
  error: string | null;
  success: string | null;
}

const initialSignupState: SignupFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  error: null,
  success: null,
};

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [signupState, setSignupState] = useState<SignupFormState>(initialSignupState);

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
      setSignupState({
        ...signupState,
        success: 'Signup successful! Please log in to proceed.',
        error: null,
      });
    } catch (error: any) {
      setSignupState({
        ...signupState,
        error: 'Signup failed: ' + (error.response?.data?.detail || error.message),
        success: null,
      });
      console.error('Signup failed:', error);
    }
    setTimeout(onClose, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        {signupState.error && (
          <Alert className="mb-4" variant="destructive" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{signupState.error}</AlertDescription>
          </Alert>
        )}
        {signupState.success && (
          <div className="mb-4" style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px' }}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{signupState.success}</AlertDescription>
          </div>
        )}
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
