import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    main: {
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
    },
    tableContainer: {
        marginTop: 20
    },
    rowImage: {
        maxWidth: "70%",
        maxHeight: "70%"
    },
}));