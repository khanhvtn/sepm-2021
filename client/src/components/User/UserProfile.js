import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import photo from '../../images/test-image.JPG';
import useStyles from './styles';
import {
    PhotoCamera,
    AccountBalance,
    MonetizationOn,
} from '@material-ui/icons';
import { updateUser } from '../../actions/auths';

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
    points: '0',
    accountBalance: '0',
};

const initialError = {
    error: false,
    message: '',
};
const validateChangePoint = (userInfo, changePoints) => {
    var error = false,
        message = '';
    var { points } = userInfo;
    if (parseInt(changePoints) > parseInt(points)) {
        error = true;
        message = `Exchange points can't be greater than current points.`;
    }
    return { error, message };
};
const UserProfile = () => {
    const userInfo = useSelector((state) => state.auth.authData?.result);
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
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

    //handle input change
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: event.target.value.replace(/\D/, ''),
        });
        setErrorForm(initialError);
    };
    //handle change photo
    const handleChangePhoto = () => {};
    //handle exchange point
    const handleExchangePoint = (e) => {
        e.preventDefault();
        const { error, message } = validateChangePoint(userInfo, state.points);
        if (error) {
            return setErrorForm({ ...errorForm, error, message });
        }
        //calculate new points and new account balance
        const points = String(
            parseInt(userInfo.points) - parseInt(state.points)
        );
        const accountBalance = String(
            parseInt(userInfo.accountBalance) + parseInt(state.points)
        );
        const newUpdateUser = { ...userInfo, points, accountBalance };
        dispatch(updateUser(newUpdateUser));
        setState(initialState);
    };
    //handle deposit money
    const handleDepositMoney = (e) => {
        e.preventDefault();
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
                        >
                            <Typography variant="h3">
                                {userInfo?.name}
                            </Typography>
                            {/* Photo Section */}
                            <Avatar
                                src={
                                    userInfo?.imageUrl
                                        ? userInfo?.imageUrl
                                        : photo
                                }
                                alt={userInfo?.name}
                                className={classes.avatar}
                            />
                            <Button
                                onClick={handleChangePhoto}
                                className={classes.btnPhotoCamera}
                                endIcon={<PhotoCamera />}
                            >
                                Change Image
                            </Button>
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
                        </Grid>
                    </Paper>
                </Grow>
            </Grid>
            <Grid className={classes.gridRight} item container xs={12} sm={8}>
                <Paper className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            aria-label="user tabs example"
                        >
                            <Tab label="Wallet" {...a11yProps(0)} />
                            <Tab label="Exchange Point" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <form
                            className={`${classes.form}`}
                            noValidate
                            onSubmit={handleDepositMoney}
                        >
                            <TextField
                                value={state.accountBalance}
                                name="accountBalance"
                                onChange={handleChange}
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
                                Deposit to wallet
                            </Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <form
                            className={`${classes.form}`}
                            noValidate
                            onSubmit={handleExchangePoint}
                        >
                            <TextField
                                value={state.points}
                                name="points"
                                onChange={handleChange}
                                error={errorForm.error}
                                variant="outlined"
                                className={classes.input}
                                type="text"
                                label="Number of points"
                                helperText={errorForm.message}
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
                                Exchange to Money
                            </Button>
                        </form>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
