import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    title: {
        fontSize: '3em',
    },

    rootSuggested: {
        flexGrow: 1
    },

    suggested: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
        marginTop: 24,
        marginBottom: 12,
        lineHeight: 1
    },

    vouchers: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
        marginTop: 32,
        marginBottom: 12,
        lineHeight: 1
    },

    viewAll: {
        float: 'right',
        fontSize: '1rem',
        lineHeight: 1,
    },

    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        paddingBottom: 10

    },
}));
