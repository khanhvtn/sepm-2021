import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    main: {
        zIndex: 0,
        background: '#eaeff1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: theme.spacing(2),
    },

    titlePage: {
        fontSize: 20
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "white",
        backgroundColor: "#e24378"
    },


    paper1: {
        marginTop: 20,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "black",
        // backgroundColor: "#e24378"
    },

    mainGrid: {
        marginTop: 10
    },

    contentWrapper: {
        marginTop: 20
    }


}));