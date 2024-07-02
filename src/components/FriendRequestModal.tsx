// import React from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
// import { Button } from './shadcn/components/ui/button'
// import { sendFriendRequest } from '../services/api';
// import { User } from '../types';

// interface FriendRequestModalProps {
//   user: User;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const FriendRequestModal: React.FC<FriendRequestModalProps> = ({ user, isOpen, onClose }) => {
//   console.log("User in FR model is : ", user.id)
//   const handleSendRequest = async () => {
//     try {
//       await sendFriendRequest(user.id);
//       onClose();
//     } catch (error) {
//       console.error('Failed to send friend request:', error);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//         <DialogTitle>Send Friend Request</DialogTitle>
//         </DialogHeader>
//         <p>Do you want to send a friend request to {user.username}?</p>
//         <DialogFooter>
//           <Button onClick={handleSendRequest}>Send Request</Button>
//           <Button variant="outline" onClick={onClose}>Cancel</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FriendRequestModal;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
import { Button } from './shadcn/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { sendFriendRequest, getUserProfile } from '../services/api';
import { User, UserWithStatus } from '../types';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface FriendRequestModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({ user, isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState<UserWithStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getUserProfile(user.id);
        setUserProfile(profile);
        setError(null);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user profile:', err);
      } finally {
        setIsLoading(false);
      }
    };    
    if (isOpen) {
      fetchUserProfile();
    }
  }, [user.id, isOpen]);

  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser);
      if (!loggedInUser) {
        return null; // Or some placeholder content
      }

  const handleSendRequest = async () => {
    try {
      
      await sendFriendRequest(loggedInUser?.id, user.id);
      onClose();
    } catch (error) {
      console.error('Failed to send friend request:', error);
      setError('Failed to send friend request');
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Friend Request</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p>Loading user profile...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : userProfile ? (
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>{"NA"}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{userProfile.first_name} {userProfile.last_name}</h2>
            <p className="text-gray-600">@{userProfile.username}</p>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-gray-600">Status: {userProfile.status_updates && userProfile.status_updates.length>0
            ?userProfile.status_updates[0].status:"NA"}</p>
          </div>
        ) : null}
        <DialogFooter>
          <Button onClick={handleSendRequest} disabled={isLoading || !!error}>Send Request</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestModal;