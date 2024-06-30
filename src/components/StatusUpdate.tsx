import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from './shadcn/components/ui/button';
import { Textarea } from './shadcn/components/ui/textarea';
import { updateStatus } from '../services/api';
import { updateFriendStatus } from '../store/friendsSlice';

const StatusUpdate: React.FC = () => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const handleStatusUpdate = async () => {
    try {
      const updatedStatus = await updateStatus(status);
      dispatch(updateFriendStatus(updatedStatus));
      setStatus('');
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Update Your Status</h2>
      <Textarea
        placeholder="What's on your mind?"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Button onClick={handleStatusUpdate}>Update Status</Button>
    </div>
  );
};

export default StatusUpdate;