import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '0 24px 24px 24px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    branding: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
    logo: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    title: {
        fontWeight: 'bold'
    },
    content: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1),
    },

    description: {
        flex: '1 0 auto',
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },

    cover: {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    playIcon: {
        height: 38,
        width: 38,
    },

    getButton: {
        border: '2px solid',
        fontWeight: 'bold',
    },
}));