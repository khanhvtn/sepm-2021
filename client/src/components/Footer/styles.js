import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    root: {
        padding: '0 30px',
        paddingBottom: '4px'
    },
    upper: {
        padding: '28px 0',
    },
    gridLeft: {
        maxWidth: '300px',
    },
    upperLink: {
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '1.1em',
    },
    gridRight: {
        flex: 1,
    },
    upperIcon: {
        marginLeft: '28px',
    },
    lower: {
        padding: '0 0 10px 0',
    },
    lowerCopyright: {
        fontSize: '1em',
    },
    lowerLink: {
        marginLeft: '32px',
        textDecoration: 'none',
        fontWeight: '400',
        fontSize: '1em',
    },
    [theme.breakpoints.down('sm')]: {
        lower: {
            flexDirection: 'column-reverse',
            alignItems: 'center',
        },
        upper: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        gridRight: {
            justifyContent: 'center',
        },
        upperIcon: {
            margin: '0 14px',
        },
        lowerLink: {
            margin: '0 16px',
            lineHeight: '2em',
        },
        lowDeviceMT: {
            marginTop: '30px',
        },
    },
    [theme.breakpoints.down('xs')]: {
        upperLink: {
            fontSize: '1em',
        },
        lowerLink: {
            fontSize: '0.9em',
        },
        lowerCopyright: {
            fontSize: '0.9em',
        },
    },
}));
