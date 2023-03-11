import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { closeModal, deleteUsers } from '../../features/users/usersSlice';

import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Chip, Button, Avatar } from '@mui/material';
import { Work as WorkIcon, AlternateEmailOutlined as AlternateEmailOutlinedIcon, BusinessOutlined as BusinessOutlinedIcon } from '@mui/icons-material';


const UserDetails = () => {
    const dispatch = useAppDispatch();
    const { selectedUser, openModal } = useAppSelector((state: RootState) => state.usersStore);

    const handleDelete = () => {
        if(selectedUser) {
            dispatch(deleteUsers([selectedUser.id]));
            dispatch(closeModal());
        }
    }

    const handleClose = () => {
        dispatch(closeModal());
    }

    return (
        <Dialog open={openModal} onClose={handleClose}>
            <DialogTitle>
                {selectedUser?.name}
                <Chip size="small" sx={{ml: "10px"}} label={"@" + selectedUser?.username} />
            </DialogTitle>
            <DialogContent>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <AlternateEmailOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={selectedUser?.email.toLowerCase()} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Company" secondary={selectedUser?.company.name} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <BusinessOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Address" secondary={selectedUser?.address.street+", "+selectedUser?.address.suite + " " + selectedUser?.address.city + " " + selectedUser?.address.zipcode + ""} />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions sx={{p: "20px"}}>
                <Button onClick={handleDelete}>Delete</Button>
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetails;
