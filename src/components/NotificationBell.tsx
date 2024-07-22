import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from './shadcn/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './shadcn/components/ui/popover';

const NotificationBell: React.FC = () => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">{"Not Implemented Yet"}</h4>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;