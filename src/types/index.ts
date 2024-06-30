export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface FriendStatus {
    id: string;
    userId: string;
    username: string;
    status: string;
  }
  
  export interface Notification {
    id: string;
    type: 'friendRequest' | 'statusUpdate';
    message: string;
    data: any;
  }