import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from './shadcn/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { searchUsers } from '../services/api';
import FriendRequestModal from './FriendRequestModal';
import { User } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!loggedInUser) {
          return null;
        }
        const results = await searchUsers(loggedInUser.id, searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [loggedInUser, searchTerm]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchResults([]);
  };

  return (
    <div className="space-y-4 relative flex-grow">
      <div className="relative flex items-center w-full">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search non-friend users by username or email and send friend request"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow text-lg pl-10 w-full"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-50">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={() => handleSelectUser(user)}
            >
              <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.first_name} ${user.last_name}`} />
                <AvatarFallback>{"NA"}</AvatarFallback>
              </Avatar>
              <span>{user.first_name} {user.last_name} ({user.username})</span>
            </div>
          ))}
        </div>
      )}
      {selectedUser && (
        <FriendRequestModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default SearchBar;
