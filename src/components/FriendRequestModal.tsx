import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './shadcn/components/ui/dialog';
import { Button } from './shadcn/components/ui/button'
import { sendFriendRequest } from '../services/api';
import { User } from '../types';

interface FriendRequestModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({ user, isOpen, onClose }) => {
  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(user.id);
      onClose();
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Send Friend Request</DialogTitle>
        </DialogHeader>
        <p>Do you want to send a friend request to {user.username}?</p>
        <DialogFooter>
          <Button onClick={handleSendRequest}>Send Request</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestModal;