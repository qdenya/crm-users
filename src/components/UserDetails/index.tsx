import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal, deleteUsers } from '../../redux/users/usersSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Chip, Button, Avatar } from '@mui/material';
import { Work as WorkIcon, AlternateEmailOutlined as AlternateEmailOutlinedIcon, BusinessOutlined as BusinessOutlinedIcon } from '@mui/icons-material';

const UserDetails = () => {
    const dispatch = useAppDispatch();
    const { selectedUser, openModal } = useAppSelector((state: RootState) => state.usersStore);

    if(!selectedUser) {
        return null;
    }

    const { name, username, email, company, address } = selectedUser;
    const { street, suite, city, zipcode } = address;

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
                {name}
                <Chip size="small" sx={{ml: "10px"}} label={"@" + username} />
            </DialogTitle>
            <DialogContent>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <AlternateEmailOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={email.toLowerCase()} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Company" secondary={company.name} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <BusinessOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Address" secondary={`${street}, ${suite} ${city}, ${zipcode}`} />
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
