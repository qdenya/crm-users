import axios from 'axios';
import { useEffect, useState } from 'react';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteUsers, reset, setSelectedUser, setUsers, User, openModal, setSearchTerm } from '../../features/users/usersSlice';

import { AppBar, List, ListItem, ListItemSecondaryAction, IconButton, TextField, InputAdornment, Typography, Box, Toolbar  } from '@mui/material';
import { Delete as DeleteIcon, Refresh as RefreshIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';

const UserList = () => {
    const dispatch = useAppDispatch();
    const { filteredUsers } = useAppSelector((state: RootState) => state.usersStore);

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
        dispatch(openModal());
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        dispatch(setSearchTerm(value));
    }

    const getFilterText = (text: string, filter: string, variant: string ) => {
        const parts = text.split(new RegExp(`(${filter})`, "gi"));

        const getColor = () => {
            switch (variant) {
                case "body2":
                    return "grey.500";
                default:
                    return "black.500";
            }
        } 

        const getVariant = () => {
            switch (variant) {
                case "body2":
                    return "body2";
                default:
                    return "body1";
            }
        } 

        return (
            <Typography variant={getVariant()} color={getColor()}>
            {parts.map((part, i) =>
                part.toLowerCase() === filter.toLowerCase() ? (
                <Box
                    component="span"
                    key={i}
                    fontWeight="bold"
                    bgcolor="highlight"
                >
                    {part}
                </Box>
                ) : (
                <span key={i}>{part}</span>
                )
            )}
            </Typography>
        );
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField
                            label="Search users"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleReset}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <List sx={{mt: "80px"}}>
                {filteredUsers.map((user) => (
                    <ListItem key={user.id}>
                        <Box>   
                            {getFilterText(user.name, searchValue, "body1")} 
                            {getFilterText("Email: " + (user.email).toLowerCase(), searchValue, "body2")} 
                            {getFilterText("Nick: " + user.username, searchValue, "body2")} 
                        </Box>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="more" onClick={() => handleUserClick(user)}>
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