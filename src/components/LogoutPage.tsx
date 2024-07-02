import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './shadcn/components/ui/button'

const LogoutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">You are logged out</h1>
      <Link to="/login">
        <Button>Click here to login again</Button>
      </Link>
    </div>
  );
};

export default LogoutPage;