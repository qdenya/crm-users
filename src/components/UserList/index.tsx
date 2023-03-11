import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteUsers, reset, setSearchTerm, setSelectedUser, setUsers, User } from '../../features/users/usersSlice';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, InputAdornment, Button, Typography } from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon, Refresh as RefreshIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';

const UserList = () => {
  const dispatch = useDispatch();

  const { filteredUsers } = useSelector((state: RootState) => state.usersStore);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch(setUsers(response.data));
    };
    fetchUsers();
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUsers([userId]));
  };

  const handleReset = () => {
    setSearchValue("");
    dispatch(reset());
  };
 
  const handleUserClick = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  const handleSearch = () => {
    const filtered = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    //dispatch(setFilteredUsers(filtered));
    dispatch(setSearchTerm(searchValue));
  };
  return (
    <>
        <TextField
            label="Search users"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleReset}>
                        <RefreshIcon />
                    </IconButton>
                </InputAdornment>
            ),
            }}
        />
        <List>
            {filteredUsers.map((user) => (
                <ListItem key={user.id}>
                    <ListItemText primary={user.name} secondary={user.email} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                            <InfoIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </>
  );
};

export default UserList;