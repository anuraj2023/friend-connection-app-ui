import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { Card, CardContent } from "./shadcn/components/ui/card";
import { RootState } from '../store/store'; 

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  if (!user) {
    return null; 
  }

  return (
    <Card className="w-32 h-10">
  <CardContent className="flex items-center pt-2 space-x-2">
    <Avatar className="h-5 w-5">
    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.first_name} ${user.last_name}`} />
      <AvatarFallback>{"NA"}</AvatarFallback>
    </Avatar>
    <p className="text-md">{user.first_name}</p>
  </CardContent>
</Card>

  );
};

export default UserProfile;