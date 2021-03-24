import React, { useState } from 'react';
import useStyles from './styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createBrand } from '../../../../api';

const initialBrandData = {
    email: '',
    password: ''
}

export default function BrandDialog({ open, handleDialogClose }) {
    const classes = useStyles();
    const [brandData, setBrandData] = useState(initialBrandData);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchEvent(createBrand({ ...brandData }))
        clear();
    }

    const clear = () => {
        setBrandData(initialBrandData)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add an account for Brand</DialogTitle>
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
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions className={classes.mr16mb8}>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}