// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Input } from './shadcn/components/ui/input';
// import { searchUsers } from '../services/api';
// import FriendRequestModal from './FriendRequestModal';
// import { User } from '../types';

// const SearchBar: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const results = await searchUsers(searchTerm);
//         setSearchResults(results);
//       } catch (error) {
//         console.error('Search failed:', error);
//       }
//     };

//     if (searchTerm.trim() !== '') {
//       fetchSearchResults();
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   const handleSelectUser = (user: User) => {
//     setSelectedUser(user);
//     setSearchResults([]);
//   };

//   return (
//     <div className="space-y-4 relative">
//       <div className="relative flex items-center">
//         <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
//         <Input
//           type="text"
//           placeholder="Search non-friend users by username or email and send friend request"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-grow text-lg pl-10"
//         />
//       </div>
//       {searchResults.length > 0 && (
//         <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg">
//           {searchResults.map((user) => (
//             <div
//               key={user.id}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSelectUser(user)}
//             >
//               {user.first_name} {user.last_name} ({user.username})
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedUser && (
//         <FriendRequestModal
//           user={selectedUser}
//           isOpen={!!selectedUser}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchBar;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from './shadcn/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar"
import { searchUsers } from '../services/api';
import FriendRequestModal from './FriendRequestModal';
import { User } from '../types';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await searchUsers(searchTerm);
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
  }, [searchTerm]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchResults([]);
  };

  return (
    <div className="space-y-4 relative">
      <div className="relative flex items-center">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
        <Input
          type="text"
          placeholder="Search non-friend users by username or email and send friend request"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow text-lg pl-10"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={() => handleSelectUser(user)}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={"https://github.com/shadcn.png"} />
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