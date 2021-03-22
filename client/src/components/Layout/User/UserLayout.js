import React from 'react';
import useStyles from './styles';
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const theme = createMuiTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});


const UserLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.grow}>
                    <Navbar />
                    <Container className={classes.mainContainer} maxWidth="lg" disableGutters>
                        {children}
                    </Container>
                    <Footer />
                </div>
            </ThemeProvider>
        </>
    );
}

export default UserLayout;