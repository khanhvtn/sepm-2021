import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles'
import { CircularProgress, Tooltip, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createShareLink } from '../../../actions/links';

const GetLinkDialog = ({ open, handleClose, voucherId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { links } = useSelector((state) => state)

    const [copySuccess, setCopySuccess] = useState(false)

    useEffect(() => {
        if (open) {
            dispatch(createShareLink({ voucherId: voucherId }))
        }
    }, [dispatch]);

    const saveLinkToClipboard = () => {
        if (links.linkId) {
            var justForCopy = document.getElementById('share-link');
            justForCopy.select();
            document.execCommand("copy");
            setCopySuccess(true)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" >Get Sharable Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Welcome to the get link program. Here is how it works:
                    </DialogContentText>
                </DialogContent>
                {links.isLoading ?
                    <div align="center">
                        <CircularProgress />
                    </div>
                    :
                    links.linkId ?
                        <DialogContent className={classes.container}>
                            <TextField
                                autoFocus
                                id="share-link"
                                label="Your share link"
                                type="text"
                                variant="outlined"
                                value={links.linkId ? `localhost:3000/voucher/share/${links.linkId}` : 'Error! Cannot create link'}
                                className={classes.textField}

                            />
                            {copySuccess ?
                                <Tooltip
                                    open={copySuccess}
                                    title="Copied!"
                                    placement="top">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={saveLinkToClipboard}
                                    >
                                        Copy Link
                                </Button>
                                </Tooltip>
                                :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={saveLinkToClipboard}
                                >
                                    Copy Link
                            </Button>
                            }
                        </DialogContent>
                        :
                        <div align="center">
                            <Typography>Cannot get link!</Typography>
                        </div>
                }
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