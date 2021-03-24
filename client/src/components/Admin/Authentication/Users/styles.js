import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
    },
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',

    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    root: {
        width: '100%',
    },
    mr16mb8: {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2)
    }
}));