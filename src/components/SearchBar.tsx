import React, { useState } from 'react';
import { Input } from './shadcn/components/ui/input';
import { Button } from './shadcn/components/ui/button';
import { searchUsers } from '../services/api';
import FriendRequestModal from './FriendRequestModal';
import { User } from '../types';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {searchResults.length > 0 && (
        <ul className="bg-white shadow rounded-lg divide-y">
          {searchResults.map((user) => (
            <li
              key={user.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedUser(user)}
            >
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
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