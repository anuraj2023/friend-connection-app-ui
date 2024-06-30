import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendStatus } from '../types';

interface FriendsState {
  statuses: FriendStatus[];
}

const initialState: FriendsState = {
  statuses: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendStatuses(state, action: PayloadAction<FriendStatus[]>) {
      state.statuses = action.payload;
    },
    updateFriendStatus(state, action: PayloadAction<FriendStatus>) {
      const index = state.statuses.findIndex(status => status.id === action.payload.id);
      if (index !== -1) {
        state.statuses[index] = action.payload;
      } else {
        state.statuses.push(action.payload);
      }
    },
  },
});

export const { setFriendStatuses, updateFriendStatus } = friendsSlice.actions;
export default friendsSlice.reducer;