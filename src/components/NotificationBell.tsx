import React from 'react';
import { useSelector } from 'react-redux';
import { Bell } from 'lucide-react';
import { Button } from './shadcn/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './shadcn/components/ui/popover';
import { RootState } from '../store/store';

const NotificationBell: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-2">
              <div>
                <p className="text-sm font-medium">{notification.type}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;