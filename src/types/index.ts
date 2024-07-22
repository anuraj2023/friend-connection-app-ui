export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  export interface StatusDetails{
    id: number;
    status: string;
    created_at: string;
  }

  export interface UserWithStatus extends User{
    status_updates: StatusDetails[];
  }

  export interface FriendRequestCreation {
    requestor_id: number;
    recipient_id: number;
  }

  export interface FriendStatus {
    id: string;
    userId: string;
    username: string;
    status: string;
  }

  export interface StatusUpdateResponse{
    id: number,
    status: string,
    created_at: string,
    user_id: number;
  }

  export interface FriendRequest {
    id: number;
    requestor_id: number;
    recipient_id: number;
    requestor_username: string;
    requestor_email: string;
    status: string;
    created_at: string;
  }
  
  // export interface Notification {
  //   id: string;
  //   type: 'friendRequest' | 'statusUpdate';
  //   message: string;
  //   data: any;
  // }

  export interface FriendDetailResponse{
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  status_updated_at: string;
  }

  export interface FriendDetails{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    latest_status: string;
    status_created_at: string;
  }
