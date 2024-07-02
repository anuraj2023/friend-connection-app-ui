// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// // import { User } from '../types';

// // interface AuthState {
// //   loggedInUser: int;
// //   isAuthenticated: boolean;
// // }

// // const initialState: AuthState = {
// //   loggedInUser: null,
// //   isAuthenticated: false,
// // };

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     login(state, action: PayloadAction<User>) {
// //       state.loggedInUser = action.payload;
// //       state.isAuthenticated = true;
// //     },
// //     logout(state) {
// //       state.loggedInUser = -1;
// //       state.isAuthenticated = false;
// //     },
// //   },
// // });

// // export const { login, logout } = authSlice.actions;
// // export default authSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   loggedInUserId: number | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   loggedInUserId: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action: PayloadAction<number>) {
//       state.loggedInUserId = action.payload;
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.loggedInUserId = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface AuthState {
  loggedInUser: User | null;
  isAuthenticated: boolean;
}

const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        loggedInUser: null,
        isAuthenticated: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      loggedInUser: null,
      isAuthenticated: false,
    };
  }
};

const saveAuthState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
      state.isAuthenticated = true;
      saveAuthState(state);
    },
    logout(state) {
      state.loggedInUser = null;
      state.isAuthenticated = false;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;