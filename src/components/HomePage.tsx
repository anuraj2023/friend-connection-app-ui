// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Button } from './shadcn/components/ui/button';
// import SearchBar from './SearchBar';
// import FriendList from './FriendList';
// import StatusUpdate from './StatusUpdate';
// import NotificationBell from './NotificationBell';
// import { logout } from '../store/authSlice';
// import FriendRequestsTable from './FriendRequestsTable';

// const HomePage: React.FC = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleLogout = () => {
//     dispatch(logout());
//     history.push('/logout');
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <div className="flex-grow mr-4 max-w-[500]">
//           <SearchBar />
//         </div>
//         <div className="flex items-center space-x-4">
//           <NotificationBell />
//           <Button onClick={handleLogout}>Logout</Button>
//         </div>
//       </div>
//       <div className="flex space-x-8">
//         <div className="w-1/2">
//           <FriendList />
//         </div>
//         <div className="w-1/2">
//           <StatusUpdate />
//           <FriendRequestsTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from './shadcn/components/ui/button';
import { Card } from './shadcn/components/ui/card'; // Assuming Card component import
import SearchBar from './SearchBar';
// import FriendList from './FriendList';
import StatusUpdate from './StatusUpdate';
import NotificationBell from './NotificationBell';
import { logout } from '../store/authSlice';
import FriendRequestsTable from './FriendRequestsTable';
import UserProfile from './UserProfile';
import FriendList from './FriendList';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/logout');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
      
        <div className="flex-grow mr-4 max-w-[500]">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <UserProfile/>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <Button onClick={handleLogout}>Logout</Button>
        </div>

      </div>
      <div className="flex space-x-8">
        <div className="w-1/2">
          <Card className="p-4">
            <FriendList />
          </Card>
        </div>
        <div className="w-1/2">
          <Card className="p-4">
            <StatusUpdate />
          </Card>
          <Card className="p-4 mt-4">
            <FriendRequestsTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

