import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    // menuButton: {
    //     marginRight: theme.spacing(20),
    // },
    // title: {
    //     flexGrow: 1,
    //     display: 'none',
    //     marginTop: 5,
    //     textAlign:'center',
    // grow: {
    //     flexGrow: 1,
    // },


    appBar: {
        padding: '5px 20px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,


        // backgroundColor: fade(theme.palette.action.hover, 0.05),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.action.hover, 0.1),
        // },
        // marginLeft: 0,
        // width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(1),


        backgroundColor: fade(theme.palette.common.black, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.15),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        //     width: '15ch',
        //     '&:focus': {
        //         width: '45ch',
        //     },
        // },
            width: '20ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    sectionDesktopUnAuth: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionMobileUnAuth: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    removeStyleLink: {
        textDecoration: 'none',
    },
    btnAuth: {
        marginLeft: '10px',
    },
}));
