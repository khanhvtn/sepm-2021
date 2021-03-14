import {
    AppBar,
    Grid,
    Typography,
    Link as NormalLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="static" color="inherit">
            <Grid container direction="column">
                <Grid className={classes.upper} container item>
                    <Grid
                        className={classes.gridLeft}
                        item
                        container
                        justify="space-between"
                    >
                        <Typography>
                            <Link className={classes.upperLink} to="/">
                                Contact
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.upperLink} to="/">
                                Corporate
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.upperLink} to="/">
                                Press
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.upperLink} to="/">
                                Careers
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        className={`${classes.gridRight} ${classes.lowDeviceMT}`}
                        container
                        justify="flex-end"
                    >
                        <NormalLink
                            className={classes.upperIcon}
                            href="/"
                            color="inherit"
                        >
                            <Facebook />
                        </NormalLink>
                        <NormalLink
                            className={classes.upperIcon}
                            href="/"
                            color="inherit"
                        >
                            <Twitter />
                        </NormalLink>
                        <NormalLink
                            className={classes.upperIcon}
                            href="/"
                            color="inherit"
                        >
                            <Instagram />
                        </NormalLink>
                    </Grid>
                </Grid>
                <Grid className={classes.lower} container item>
                    <Grid
                        item
                        className={`${classes.gridLeft} ${classes.lowDeviceMT}`}
                    >
                        <Typography
                            className={classes.lowerCopyright}
                            color="textSecondary"
                        >
                            Copyright © Vouchy. All rights reserved
                        </Typography>
                    </Grid>
                    <Grid
                        className={classes.gridRight}
                        item
                        container
                        justify="flex-end"
                    >
                        <Typography>
                            <Link className={classes.lowerLink} to="/">
                                Support
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.lowerLink} to="/">
                                Terms of service
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.lowerLink} to="/">
                                Cookie Policy
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.lowerLink} to="/">
                                Privacy Policy
                            </Link>
                        </Typography>
                        <Typography>
                            <Link className={classes.lowerLink} to="/">
                                Accessibility
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Footer;
