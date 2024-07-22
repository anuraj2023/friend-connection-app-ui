import React, { useState, useEffect } from 'react';
import { Button } from './shadcn/components/ui/button';
import { Textarea } from './shadcn/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
import { updateStatus, getStatus } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Toaster } from './shadcn/components/ui/toaster';
import { useToast } from './shadcn/components/ui/use-toast';

const StatusUpdate: React.FC = () => {
  const [status, setStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { toast } = useToast();
  const authState = useSelector((state: RootState) => state.auth);
  const loggedInUserId = authState.loggedInUser?.id;

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        if (!loggedInUserId) {
          setAlertMessage('User not logged in');
          setShowAlert(true);
          return;
        }

        const response = await getStatus(loggedInUserId);
        setStatus(response.status);
      } catch (error) {
        console.error('Failed to fetch status:', error);
      }
    };

    fetchUserStatus();
  }, [loggedInUserId]);

  const handleStatusUpdate = async () => {
    try {
      if (!loggedInUserId) {
        setAlertMessage('User not logged in');
        setShowAlert(true);
        return;
      }

      await updateStatus(status, loggedInUserId);
      setStatus(status);
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Status updated successfully',
        duration: 2000,
        className: 'bg-green-500 text-white'
      });
    } catch (error) {
      console.error('Status update failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update status',
        duration: 2000
      });
    }
    setTimeout(() => setShowAlert(false), 1000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Update Your Status</h2>
      {showAlert && (
        <Alert className="mb-4" variant="default">
          <AlertTitle>{alertMessage}</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <Textarea
        placeholder="What's on your mind?"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleStatusUpdate}>Update Status</Button>
      </div>
      <Toaster />
    </div>
  );
};

export default StatusUpdate;

