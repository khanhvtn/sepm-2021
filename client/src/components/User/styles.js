import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '300px',
        margin: '90px auto',
    },
    tab: {
        display: 'flex',
    },
    button: {
        marginTop: '10px',
    },
    input: {
        width: '100%',
        marginBottom: '15px',
    },
    inputImage: {
        display: 'none',
    },
    paper: {
        width: '100%',
        padding: '15px 0',
    },
    avatar: {
        height: theme.spacing(20),
        width: theme.spacing(20),
        fontSize: '5em',
        color: theme.palette.getContrastText(pink[400]),
        backgroundColor: pink[400],
    },
    btnPhotoCamera: {
        marginTop: '10px',
    },
    briefInfo: {
        fontSize: '1.2em',
    },
    btnCancel: {
        marginLeft: '10px',
    },
    [theme.breakpoints.down('xs')]: {
        gridRight: {
            marginTop: '10px',
        },
    },
}));
