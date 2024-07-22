import React, { useEffect, useState } from 'react';
import { Button } from './shadcn/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './shadcn/components/ui/table';
import { getFriendRequests, updateFriendRequest } from '../services/api';
import { FriendRequest } from '../types';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const FriendRequestsTable: React.FC = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  const authState = useSelector((state: RootState) => state.auth);

      
  useEffect(() => {
    
    const fetchFriendRequests = async () => {
      try {
        const loggedInUserId: number = authState.loggedInUser?authState.loggedInUser.id:0;
        if(loggedInUserId !== 0){
            const requests = await getFriendRequests(loggedInUserId);
            setFriendRequests(requests);
        }
      } catch (error) {
        console.error('Failed to fetch friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, [authState.loggedInUser]);

  const handleRequestAction = async (id: number, action: string) => {
    try {
      await updateFriendRequest(id, action);
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Failed to update friend request:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Friend Requests</h2>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2">Username</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {friendRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="border border-gray-300 px-4 py-2 text-center">
                No friend requests
              </TableCell>
            </TableRow>
          ) : (
            friendRequests.map((request) => (
              <TableRow key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell className="px-4 py-2">{request.requestor_username}</TableCell>
                <TableCell className="px-4 py-2">{request.requestor_email}</TableCell>
                <TableCell className="px-4 py-2 flex justify-center gap-4">
                  <Button
                    variant="default"
                    onClick={() => handleRequestAction(request.id, 'accept')}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRequestAction(request.id, 'reject')}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FriendRequestsTable;
