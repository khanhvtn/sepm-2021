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
import { updateUser } from '../../actions/auths';
import { convertBase64 } from '../../utils';
import { USER_LOADING } from '../../constants/actionTypes';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            className={classes.tab}
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
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
        id: `user-tab-${index}`,
        'aria-controls': `user-tabpanel-${index}`,
    };
}

const initialState = {
    name: '',
    address: '',
    phone: '',
    points: '0',
    accountBalance: '0',
    imageUrl: null,
};

const initialError = {
    points: {
        error: false,
        message: '',
    },
    name: {
        error: false,
        message: '',
    },
    phone: {
        error: false,
        message: '',
    },
    address: {
        error: false,
        message: '',
    },
};
const validateProfile = (name, currentValue) => {
    var error = false,
        message = '';
    switch (name) {
        case 'name':
            if (currentValue.length === 0) {
                error = true;
                message = "Name can't be blanked.";
            }
            return { name: { error, message } };
        case 'phone':
            if (currentValue.length === 0) {
                error = true;
                message = "Phone can't be blanked.";
            }
            return { phone: { error, message } };
        case 'address':
            if (currentValue.length === 0) {
                error = true;
                message = "Address can't be blanked.";
            }
            return { address: { error, message } };
        default:
            break;
    }
};
const validateChangePoint = (userInfo, changePoints) => {
    var error = false,
        message = '';
    var { points } = userInfo;
    if (parseInt(points) === 0) {
        error = true;
        message = `You dont have any point to exchange.`;
    } else if (changePoints === '' || parseInt(changePoints) === 0) {
        error = true;
        message = `Exchange points can't be 0 or empty.`;
    } else if (parseInt(changePoints) > parseInt(points)) {
        error = true;
        message = `Exchange points can't be greater than current points.`;
    }
    return { points: { error, message } };
};
const UserProfile = () => {
    const { userInfo, auth } = useSelector((state) => ({
        userInfo: state.auth.authData?.result,
        auth: state.auth,
    }));
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const fileInput = useRef(null);
    const [value, setValue] = React.useState(location.state.action);
    const [state, setState] = useState(initialState);
    const [errorForm, setErrorForm] = useState(initialError);

    useEffect(() => {
        setValue(location.state.action);
    }, [location.state.action]);
    //handle Tab change
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setState(initialState);
    };

    //handle input change num
    const handleChangeNum = (e) => {
        setState({
            ...state,
            [e.target.name]: event.target.value.replace(/\D/, ''),
        });
        setErrorForm(initialError);
    };
    //handle input change Text
    const handleChangeText = (e) => {
        setState({
            ...state,
            [e.target.name]: event.target.value,
        });
        setErrorForm(initialError);
    };
    //handle change photo
    const handleChangePhoto = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileBase64 = await convertBase64(file);
            setState({ ...state, imageUrl: fileBase64 });
        }
    };
    //handle exchange point
    const handleExchangePoint = (e) => {
        e.preventDefault();
        const { points: errPoints } = validateChangePoint(
            userInfo,
            state.points
        );
        if (errPoints.error) {
            return setErrorForm({ ...errorForm, points: errPoints });
        }
        //calculate new points and new account balance
        const points = String(
            parseInt(userInfo.points) - parseInt(state.points)
        );
        const accountBalance = String(
            parseInt(userInfo.accountBalance) + parseInt(state.points)
        );
        const newUpdateUser = { ...userInfo, points, accountBalance };
        dispatch({ type: USER_LOADING, payload: true });
        dispatch(updateUser(newUpdateUser));
        setState(initialState);
    };
    //handle deposit money
    const handleDepositMoney = (e) => {
        e.preventDefault();
    };

    //handle update profile
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const listName = [...e.target]
            .map((target) => target.name)
            .filter((name) => name);
        var newUpdateUser = { ...userInfo };
        //check profile validation
        var error = false;
        listName.forEach((name) => {
            const targetError = validateProfile(name, state[name]);
            if (targetError[name].error) {
                error = true;
            }
            setErrorForm((prevState) => ({
                ...prevState,
                [name]: {
                    ...errorForm[name],
                    error: targetError[name].error,
                    message: targetError[name].message,
                },
            }));
        });
        if (error) return;
        listName.forEach((name) => {
            newUpdateUser = { ...newUpdateUser, [name]: state[name] };
        });
        dispatch(updateUser(newUpdateUser));
        setState(initialState);
    };

    //hanlde save user image
    const handleSaveUserImage = () => {
        const { imageUrl } = state;
        const newUpdateUser = { ...userInfo, imageUrl };
        dispatch({ type: USER_LOADING, payload: true });
        dispatch(updateUser(newUpdateUser));
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
                    <Paper className={classes.paper}>
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="center"
                            zeroMinWidth
                        >
                            <Typography variant="h4" gutterBottom>
                                {userInfo?.name}
                            </Typography>
                            {/* Photo Section */}

                            {auth.isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Avatar
                                    src={
                                        state.imageUrl
                                            ? state.imageUrl
                                            : userInfo?.imageUrl
                                            ? userInfo?.imageUrl
                                            : '/error.png'
                                    }
                                    alt={userInfo?.name}
                                    className={classes.avatar}
                                />
                            )}
                            <input
                                ref={fileInput}
                                accept="image/*"
                                className={classes.inputImage}
                                id="change-image"
                                type="file"
                                onChange={handleChangePhoto}
                            />
                            {state.imageUrl ? (
                                <Grid
                                    className={classes.btnPhotoCamera}
                                    item
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button
                                        onClick={handleSaveUserImage}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Save />}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                imageUrl: null,
                                            });
                                            fileInput.current.value = '';
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.btnCancel}
                                        endIcon={<Cancel />}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            ) : (
                                <label htmlFor="change-image">
                                    <Button
                                        component="span"
                                        // onClick={handleChangePhoto}
                                        className={classes.btnPhotoCamera}
                                        endIcon={<PhotoCamera />}
                                    >
                                        Change Image
                                    </Button>
                                </label>
                            )}

                            {/* Brief infomation */}
                            <Button
                                className={classes.briefInfo}
                                endIcon={<MonetizationOn />}
                            >
                                {userInfo?.points}
                            </Button>
                            <Button
                                className={classes.briefInfo}
                                endIcon={<AccountBalance />}
                            >
                                {userInfo?.accountBalance}
                            </Button>
                            <Button
                                className={classes.briefInfo}
                                endIcon={<Phone />}
                            >
                                {userInfo?.phone}
                            </Button>
                            <Button
                                className={classes.briefInfo}
                                endIcon={<LocationCity />}
                            >
                                {userInfo?.address}
                            </Button>
                        </Grid>
                    </Paper>
                </Grow>
            </Grid>
            <Grid className={classes.gridRight} item container xs={12} sm={8}>
                <Paper className={classes.root}>
                    <AppBar position="static" color="inherit">
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            aria-label="user tabs example"
                        >
                            <Tab label="Profile" {...a11yProps(0)} />
                            <Tab label="Wallet" {...a11yProps(1)} />
                            <Tab label="Exchange Point" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <form
                            className={`${classes.form}`}
                            noValidate
                            onSubmit={handleUpdateProfile}
                        >
                            <TextField
                                error={errorForm.name.error}
                                helperText={errorForm.name.message}
                                value={state.name}
                                name="name"
                                onChange={handleChangeText}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Name"
                            />
                            <TextField
                                error={errorForm.phone.error}
                                helperText={errorForm.phone.message}
                                value={state.phone}
                                name="phone"
                                onChange={handleChangeNum}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Phone"
                            />
                            <TextField
                                error={errorForm.address.error}
                                helperText={errorForm.address.message}
                                value={state.address}
                                name="address"
                                onChange={handleChangeText}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Address"
                            />
                            <Button
                                type="submit"
                                className={classes.button}
                                size="large"
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                {auth.isLoading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    'Update Profile'
                                )}
                            </Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <form
                            className={`${classes.form}`}
                            noValidate
                            onSubmit={handleDepositMoney}
                        >
                            <TextField
                                value={state.accountBalance}
                                name="accountBalance"
                                onChange={handleChangeNum}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Amount of money"
                            />
                            <Button
                                type="submit"
                                className={classes.button}
                                size="large"
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                {auth.isLoading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    'Deposit to wallet'
                                )}
                            </Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <form
                            className={`${classes.form}`}
                            noValidate
                            onSubmit={handleExchangePoint}
                        >
                            <TextField
                                value={state.points}
                                name="points"
                                onChange={handleChangeNum}
                                error={errorForm.points.error}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Number of points"
                                helperText={errorForm.points.message}
                                inputProps={{
                                    min: 0,
                                    max: userInfo?.points,
                                }}
                            />
                            <Typography
                                variant="caption"
                                className={classes.button}
                            >
                                Note: 1 point equals to 1 VND
                            </Typography>
                            <Button
                                type="submit"
                                className={classes.button}
                                size="large"
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                {auth.isLoading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    'Exchange to Money'
                                )}
                            </Button>
                        </form>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
