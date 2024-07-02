// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Button } from './shadcn/components/ui/button';
// import { Input } from './shadcn/components/ui/input';
// import { Card, CardHeader, CardContent, CardFooter } from './shadcn/components/ui/card';
// import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
// import { login } from '../store/authSlice';
// import SignupModal from './SignupModal';
// import { loginUser } from '../services/api';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   // Function to handle login
//   const handleLogin = async () => {
//     try {
//       const user = await loginUser(username, password);
//       dispatch(login(user));
//       history.push('/home');
//     } catch (error: any) {
//       setError(error.response?.data?.detail || 'Login failed');
//       console.error('Login failed:', error);
//     }
//   };

//   // Effect to clear error after 3 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 2000);

//       // Clean up timer on component unmount or if error changes
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Login</h2>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert className="mb-4" variant="destructive">
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}
//           <Input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mb-4"
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mb-4"
//           />
//         </CardContent>
//         <CardFooter>
//           <Button onClick={handleLogin} className="w-full">Login</Button>
//         </CardFooter>
//         <div className="text-center mt-4">
//           <Button variant="link" onClick={() => setIsSignupModalOpen(true)}>
//             Sign up
//           </Button>
//         </div>
//       </Card>
//       <SignupModal
//         isOpen={isSignupModalOpen}
//         onClose={() => setIsSignupModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default LoginPage;

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
import { LoginResponse } from '../types';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { toast } = useToast();

  // Function to handle login
  const handleLogin = async () => {
    try {
      const user: LoginResponse = await loginUser(username, password);
      console.log("userId is : ", user.user)
      dispatch(login(user.user));
      toast({
        title: "Success",
        description: "You have successfully logged in.",
        duration: 1000,
      });
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
      <Toaster />
    </div>
  );
};

export default LoginPage;

