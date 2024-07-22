import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from './shadcn/components/ui/card';
import SearchBar from './SearchBar';
import StatusUpdate from './StatusUpdate';
import NotificationBell from './NotificationBell';
import FriendRequestsTable from './FriendRequestsTable';
import FriendList from './FriendList';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/components/ui/avatar";
import { logout } from '../store/authSlice';
import { RootState } from '../store/store';
import logo from '../assets/logo.png';


const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/logout');
  };

  return (
    <div className="py-4 px-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          {/* Left section: Company Logo and SearchBar */}
          <div className="flex items-center space-x-4 flex-grow">
            <img src={logo} alt="Company Logo" className="h-10 w-10 flex-shrink-0" />
            <div className="flex-grow max-w-3xl">
              <SearchBar />
            </div>
          </div>
          {/* Right section: Notification bell and User menu */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <NotificationBell />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.first_name} ${user?.last_name}`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                <DropdownMenuItem>Status & Activity</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings & Privacy</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
    </div>
  );
};

export default HomePage;






