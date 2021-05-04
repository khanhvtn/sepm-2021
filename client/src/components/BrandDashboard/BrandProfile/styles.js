import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        padding: '50px',
        margin: '50px'
    },
    avatar: {
        height: theme.spacing(20),
        width: theme.spacing(20),
        fontSize: '5em',
        color: theme.palette.getContrastText(pink[400]),
        backgroundColor: pink[400],
    },
    input: {
        width: '100%',
        marginBottom: '15px',
    },
    inputImage: {
        display: 'none',
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
    mtb_20: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '600px',
        margin: '90px auto',
    },
    [theme.breakpoints.down('xs')]: {
        gridRight: {
            marginTop: '10px',
        },
    },
}));