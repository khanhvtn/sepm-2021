import React, { useState, useEffect, useRef } from 'react';
import {
    Typography,
    Grid,
    Avatar,
    Button,
    Paper,
    Grow,
    Tabs,
    Tab,
    AppBar,
    TextField,
    CircularProgress,
    Divider,
    TextareaAutosize,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import {
    PhotoCamera,
    AccountBalance,
    MonetizationOn,
    Save,
    Cancel,
    Phone,
    LocationCity,
} from '@material-ui/icons';
import { convertBase64 } from '../../../utils';

const initialState = {
    name: '',
    description: '',
    brandImage: '',
    coverImage: '',
}

const BrandProfile = () => {

    const { brandData } = useSelector((state) => state.auth)
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const fileInput = useRef(null);

    const handleChangePhoto = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileBase64 = await convertBase64(file);
            setState({ ...state, brandImage: fileBase64 });
        }
    }

    const handleRemoveBrandImage = () => {
        setState({ ...state, brandImage: null });
        fileInput.current.value = '';
    }

    const handleSaveBrandImage = () => {
        console.log("Image process save!")
    }

    return (

        <Grid container className={classes.root} spacing={2}>
            <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={12}
                sm={4}
            >
                <Grow in>
                    <Paper className={classes.paper} >
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="center"
                            zeroMinWidth
                        >

                            <Typography variant="h4" gutterBottom>
                                Apple
                            </Typography>
                            <Avatar src={ state.brandImage ? state.brandImage : 'error.png'} 
                                alt='L'
                                className={classes.avatar} />
                            <input
                                ref={fileInput}
                                accept="image/*"
                                className={classes.inputImage}
                                id="change-image"
                                type="file"
                                onChange={handleChangePhoto}
                            />

                            {state.brandImage ?
                                <Grid
                                    className={classes.btnPhotoCamera}
                                    item
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Save />}
                                        onClick={handleSaveBrandImage}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.btnCancel}
                                        endIcon={<Cancel />}
                                        onClick={handleRemoveBrandImage}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                :
                                <label htmlFor="change-image">
                                    <Button
                                        component="span"
                                        className={classes.btnPhotoCamera}
                                        endIcon={<PhotoCamera />}
                                    >
                                        Change Image
                                </Button>
                                </label>
                            }
                        </Grid>

                        <Divider className={classes.mtb_20} />
                        <Grid
                            item
                            container
                            direction="column"
                            zeroMinWidth
                        >
                            <Typography variant="h6" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                            </Typography>
                        </Grid>
                    </Paper>
                </Grow>
            </Grid>
            <Grid className={classes.gridRight} item container xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom align="center">
                        This is profile form
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                    >
                        <TextField
                            name="name"
                            variant="outlined"
                            className={classes.input}
                            type="text"
                            label="Name"
                        />
                        <TextField
                            multiline
                            name="description"
                            variant="outlined"
                            rows={8}
                            rowsMax={10}
                            className={classes.input}
                            type="text"
                            label="Description"
                        />


                        <Button
                            type="submit"
                            className={classes.button}
                            size="large"
                            variant="contained"
                            fullWidth
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default BrandProfile;