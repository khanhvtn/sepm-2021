import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: 'inherit',
    },
    image: {
        width: 'inherit',
        height: 'inherit',
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
    },
}));
