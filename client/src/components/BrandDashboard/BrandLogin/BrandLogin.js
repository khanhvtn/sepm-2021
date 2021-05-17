import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Container,
    Button,
    CircularProgress
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Input from '../../Auth/Input';
import { signin, signup } from '../../../actions/brands';


const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const BrandLogin = ({ isSignup }) => {
    //useState
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { previousPath } = { ...location.state };
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
        history.push(isSignup ? '/brand/login' : '/brand/register');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup &&
                            <>
                                <Input
                                    value={formData.firstName}
                                    name="name"
                                    label="Name"
                                    handleChange={handleChange}
                                    autoFocus={true}
                                />
                            </>
                        }

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
                        {auth.isLoading ? <CircularProgress color="inherit" />
                            : isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchAuth}>
                                {isSignup
                                    ? 'Already have an account? Sign In'
                                    : `Don't have an account? Sign Up`}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default BrandLogin;
