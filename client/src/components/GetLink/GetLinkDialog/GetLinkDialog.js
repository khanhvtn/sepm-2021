import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles'
import { Typography } from '@material-ui/core';

const GetLinkDialog = ({ open, handleClose }) => {
    const classes = useStyles();

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" >Get Sharable Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Welcome to the get link program. Here is how it works:
                    </DialogContentText>
                </DialogContent>
                <DialogContent className={classes.container}>
                    <TextField
                        autoFocus
                        id="share-link"
                        label="Your share link"
                        type="text"
                        variant="outlined"
                        value="http://google.com.vn"
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Copy Link
                    </Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GetLinkDialog;