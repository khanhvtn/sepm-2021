import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Container,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Input from './Input';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { signin, signup } from '../../actions/auths';

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const Auth = ({ isSignup }) => {
    //useState
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const previousPath = location.state?.previousPath;
    const { auth } = useSelector((state) => state);

    //useEffect
    useEffect(() => {
        setFormData(initialFormData);
    }, [location]);

    //Handle
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history, previousPath));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const switchAuth = () => {
        //reset form data
        setFormData(initialFormData);
        history.push(isSignup ? '/login' : '/register');
    };
    // const googleSuccess = async (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;
    //     try {
    //         dispatch({
    //             type: 'AUTH',
    //             data: {
    //                 result,
    //                 token,
    //             },
    //         });
    //         history.push('/');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const googleFailure = () => {
    //     console.log('Google Sign In Failure');
    // };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    value={formData.firstName}
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus={true}
                                    half
                                />
                                <Input
                                    value={formData.lastName}
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}

                        <Input
                            value={formData.email}
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            value={formData.password}
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {auth.isLoading ? (
                            <CircularProgress color="inherit" />
                        ) : isSignup ? (
                            'Sign Up'
                        ) : (
                                    'Sign In'
                                )}
                    </Button>
                    {/* <GoogleLogin
                        clientId="649113248320-vcuks8cgnta6u2uhdbm67m73go4h9kdh.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchAuth}>
                                {isSignup
                                    ? 'Alrady have an account? Sign In'
                                    : `Don't have an account? Sign Up`}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
