import React from 'react';
import useStyles from './styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const theme = createMuiTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});


const BlankLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.grow}>
                    <Container className={classes.mainContainer} maxWidth="lg" disableGutters>
                        {children}
                    </Container>
                </div>
            </ThemeProvider>
        </>
    );
}

export default BlankLayout;