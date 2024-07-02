import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { Card, CardContent } from "./shadcn/components/ui/card";
import { RootState } from '../store/store'; // Adjust this import path as needed

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  console.log("User is : ", user)
  if (!user) {
    return null; // Or some placeholder content
  }

  return (
    <Card className="w-64">
      <CardContent className="flex flex-col items-center p-4 space-y-2">
        <Avatar className="h-16 w-16">
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>{"NA"}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
        <p className="text-sm text-gray-500">@{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </CardContent>
    </Card>
  );
};

export default UserProfile;