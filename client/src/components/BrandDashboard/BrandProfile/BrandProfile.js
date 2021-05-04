import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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
import Image from 'material-ui-image'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import {
    PhotoCamera,
    Save,
    Cancel,
} from '@material-ui/icons';
import { convertBase64 } from '../../../utils';
import { updateBrand } from '../../../actions/brands';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            className={classes.tab}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const initialState = {
    name: '',
    description: '',
    brandImage: '',
    coverImage: '',
}

const BrandProfile = () => {

    const { brandInfo, auth } = useSelector((state) => ({
        brandInfo: state.auth.brandData?.result,
        auth: state.auth,
    }));
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [value, setValue] = useState(0);

    const fileInput = useRef(null);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const handleChangeBrandPhoto = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileBase64 = await convertBase64(file);
            setState({ ...state, brandImage: fileBase64 });
        }
    }

    const handleChangeCoverPhoto = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileBase64 = await convertBase64(file);
            setState({ ...state, coverImage: fileBase64 });
        }
    }

    const handleRemoveCoverImage = () => {
        setState({ ...state, coverImage: null });
        fileInput.current.value = '';
    }

    const handleRemoveBrandImage = () => {
        setState({ ...state, brandImage: null });
        fileInput.current.value = '';
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        var newUpdateBrand = { ...brandInfo, name: state.name, description: state.description }
        console.log("New Update", newUpdateBrand)
        dispatch(updateBrand(newUpdateBrand))
        setState(initialState)
    }

    //hanlde save user image
    const handleSaveBrandImage = () => {
        const { brandImage } = state;
        const newUpdateBrand = { ...brandInfo, brandImage };
        dispatch(updateBrand(newUpdateBrand));
        setState(initialState);
    };

    //hanlde save user image
    const handleSaveCoverImage = () => {
        const { coverImage } = state;
        const newUpdateBrand = { ...brandInfo, coverImage };
        dispatch(updateBrand(newUpdateBrand));
        setState(initialState);
    };

    const handleChangeForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setState(initialState);
    };

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
                            {auth.isLoading ? <CircularProgress />
                                :
                                <Avatar src={state.brandImage ? state.brandImage
                                    : brandInfo?.brandImage
                                        ? brandInfo?.brandImage
                                        : 'error.png'}
                                    alt={brandInfo?.name}
                                    className={classes.avatar} />
                            }
                            <input
                                ref={fileInput}
                                accept="image/*"
                                className={classes.inputImage}
                                id="change-image"
                                type="file"
                                onChange={handleChangeBrandPhoto}
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
                            {auth.isLoading ? <div align="center"><CircularProgress /></div>
                                :
                                <Typography variant="body1" gutterBottom>
                                    {brandInfo?.description ? brandInfo.description : 'No description'}
                                </Typography>
                            }
                        </Grid>
                    </Paper>
                </Grow>
            </Grid>
            <Grid className={classes.gridRight} item container xs={12} sm={8}>
                <Paper className={classes.tabPanelCover}>
                    <AppBar position="static" color="inherit">
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            aria-label="user tabs example"
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Profile" {...a11yProps(0)} />
                            <Tab label="Cover Image" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className={classes.paper}>
                            <Typography variant="h6" gutterBottom align="center">
                                Profile Form
                            </Typography>

                            <form
                                className={classes.form}
                                noValidate
                                onSubmit={handleUpdateProfile}
                            >
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    value={state.name}
                                    onChange={handleChangeForm}
                                    className={classes.input}
                                    type="text"
                                    label="Name"
                                />

                                <TextField
                                    multiline
                                    name="description"
                                    variant="outlined"
                                    value={state.description}
                                    onChange={handleChangeForm}
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
                                    {auth.isLoading ? <CircularProgress color='inherit' /> : 'Update Profile'}
                                </Button>
                            </form>
                        </div>
                    </TabPanel>


                    <TabPanel value={value} index={1}>
                        <div className={classes.imageCover}>
                            <Typography variant="h6" gutterBottom align="center">
                                Cover Image
                            </Typography>
                            {auth.isLoading ? <div align="center"><CircularProgress /></div>
                                :
                                <Image
                                    className={classes.imageHeight}
                                    aspectRatio={16 / 9}
                                    cover={true}
                                    alt={brandInfo?.name}
                                    src={state.coverImage ? state.coverImage : brandInfo?.coverImage ? brandInfo.coverImage : "https://i.stack.imgur.com/y9DpT.jpg"} />
                            }
                            <Grid
                                item
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <input
                                    ref={fileInput}
                                    accept="image/*"
                                    className={classes.inputImage}
                                    id="change-cover-image"
                                    type="file"
                                    onChange={handleChangeCoverPhoto}
                                />
                                {state.coverImage ?
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
                                            onClick={handleSaveCoverImage}
                                        >
                                            Save
                                    </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.btnCancel}
                                            endIcon={<Cancel />}
                                            onClick={handleRemoveCoverImage}
                                        >
                                            Cancel
                                    </Button>
                                    </Grid>
                                    :
                                    <label htmlFor="change-cover-image">
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
                        </div>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default BrandProfile;