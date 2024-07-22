import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from './shadcn/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { Button } from "./shadcn/components/ui/button";
import { Card, CardContent } from "./shadcn/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/components/ui/dialog";
import { useSelector } from 'react-redux';
import { getFriendListDetails } from '../services/api';
import { RootState } from '../store/store';

interface Friend {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  latest_status: string;
  status_created_at: string;
}

const FriendList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  
  const authState = useSelector((state: RootState) => state.auth);
  const loggedInUserId = authState.loggedInUser?.id;

  useEffect(() => {
    // Fetch friends data from your API
    const fetchFriends = async () => {
      try {
        if (!loggedInUserId) {
          return;
        }
        const data = await getFriendListDetails(loggedInUserId); 
        setFriends(data);
        setFilteredFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [loggedInUserId]);

  useEffect(() => {
    const filtered = friends.filter(friend => 
      friend.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchTerm, friends]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Friends List</h2>
      <div className="relative flex items-center">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="h-96 overflow-y-auto space-y-2">
        {filteredFriends.map(friend => (
          <Card key={friend.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${friend.first_name} ${friend.last_name}`} />
                  <AvatarFallback>{friend.first_name[0]}{friend.last_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{friend.first_name} {friend.last_name}</h3>
                  <p className="text-sm text-gray-500">@{friend.username}</p>
                  <p className="text-sm text-gray-500">{friend.email}</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Status</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{friend.first_name}'s Status</DialogTitle>
                  </DialogHeader>
                  <p>{friend.latest_status}</p>
                  <p className="text-sm text-gray-500">
                    Updated: {new Date(friend.status_created_at).toLocaleString()}
                  </p>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendList;