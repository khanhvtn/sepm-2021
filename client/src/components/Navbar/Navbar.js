import { AppBar } from '@material-ui/core';
import logo from '../../images/Logo.png';
import useStyles from './styles';
const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position="sticky" color="inherit">
            <img src={logo} alt="logo" height="60" />
        </AppBar>
    );
};

export default Navbar;
