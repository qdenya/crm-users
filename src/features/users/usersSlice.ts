import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserState {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  deletedUserIds: number[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  searchTerm: '',
  deletedUserIds: [],
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    deleteUsers(state, action: PayloadAction<number[]>) {
      state.deletedUserIds = [...state.deletedUserIds, ...action.payload];
      state.filteredUsers = state.filteredUsers.filter(
        (user) => !state.deletedUserIds.includes(user.id),
      );
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        [user.name, user.username, user.email].some((field) =>
          field.toLowerCase().includes(action.payload.toLowerCase()),
        ),
      );
    },
    reset(state) {
      state.searchTerm = '';
      state.deletedUserIds = [];
      state.filteredUsers = state.users;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setUsers,
  deleteUsers,
  setSearchTerm,
  reset,
  setSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;

