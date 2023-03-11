import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { closeModal, deleteUsers, setSelectedUser } from '../../features/users/usersSlice';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { List, ListItem, ListItemAvatar, ListItemText, Chip, Button } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const UserDetails = () => {
    const dispatch = useDispatch();
    const { selectedUser, openModal } = useSelector((state: RootState) => state.usersStore);

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
                        <ListItemText primary="Email" secondary={selectedUser?.email} />
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
