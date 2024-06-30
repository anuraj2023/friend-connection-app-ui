import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from './shadcn/components/ui/button'
import SearchBar from './SearchBar';
import FriendList from './FriendList';
import StatusUpdate from './StatusUpdate';
import NotificationBell from './NotificationBell';
import { logout } from '../store/authSlice';

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
        <SearchBar />
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <div className="flex space-x-8">
        <div className="w-1/2">
          <FriendList />
        </div>
        <div className="w-1/2">
          <StatusUpdate />
        </div>
      </div>
    </div>
  );
};

export default HomePage;