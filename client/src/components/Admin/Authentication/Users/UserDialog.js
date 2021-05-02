import React, { useState } from 'react';
import useStyles from './styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const initialUserData = {
    email: '',
    password: ''
}

export default function UserDialog({ open, handleDialogClose }) {
    const classes = useStyles();
    const [userData, setUserData] = useState(initialUserData);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDialogClose();
        clear();
    }

    const clear = () => {
        setUserData(initialUserData)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add an Email/Password user</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            value={userData.email}
                            onChange={(e) => setUserData({
                                ...userData,
                                email: e.target.value
                            })}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={userData.password}
                            onChange={(e) => setUserData({
                                ...userData,
                                password: e.target.value
                            })}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions className={classes.mr16mb8}>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}