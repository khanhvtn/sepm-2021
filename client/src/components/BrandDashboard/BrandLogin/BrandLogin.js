import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Container,
    Button
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Input from '../../Auth/Input';


const initialFormData = {
    email: '',
    password: ''
};
const BrandLogin = () => {
    //useState
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { previousPath } = { ...location.state };

    //useEffect
    useEffect(() => {
        setFormData(initialFormData);
    }, [location]);

    //Handle
    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(signin(formData, history, previousPath));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5"> Sign In </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default BrandLogin;
