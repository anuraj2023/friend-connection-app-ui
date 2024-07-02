import { store } from '../store/store';
import { addNotification } from '../store/notificationsSlice';
// import { updateFriendStatus } from '../store/friendsSlice';

let socket: WebSocket | null = null;

export const connectWebSocket = (userId: string) => {
  socket = new WebSocket(`ws://your-fastapi-backend-url.com/ws/${userId}`);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'friendRequest':
        store.dispatch(addNotification({
          id: Date.now().toString(),
          type: 'friendRequest',
          message: `${data.username} sent you a friend request`,
          data: data,
        }));
        break;
      case 'statusUpdate':
        //store.dispatch(updateFriendStatus(data.status));
        store.dispatch(addNotification({
          id: Date.now().toString(),
          type: 'statusUpdate',
          message: `${data.username} updated their status`,
          data: data,
        }));
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};