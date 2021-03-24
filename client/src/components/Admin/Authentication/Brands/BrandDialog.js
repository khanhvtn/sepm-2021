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
    password: '',
    name: '',
    category: '',
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
                            fullWidth
                            id="email"
                            label="Email"
                            margin="dense"
                            type="email"
                            variant="outlined"
                            value={brandData.email}
                            onChange={(e) =>
                                setBrandData({
                                    ...brandData,
                                    name: e.target.value
                                })
                            }
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            margin="dense"
                            value={brandData.name}
                            onChange={(e) =>
                                setBrandData({
                                    ...brandData,
                                    name: e.target.value
                                })
                            }
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            value={brandData.password}
                            onChange={(e) =>
                                setBrandData({
                                    ...brandData,
                                    name: e.target.value
                                })
                            }
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            id="category"
                            label="Category"
                            variant="outlined"
                            margin="dense"
                            value={brandData.category}
                            onChange={(e) =>
                                setBrandData({
                                    ...brandData,
                                    category: e.target.value,
                                })
                            }
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