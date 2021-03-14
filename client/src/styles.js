import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    mainContainer: {
        minHeight: '100vh',
        margin: '30px auto',
        padding: '16px',
        maxWidth: '900px',
    },
}));
