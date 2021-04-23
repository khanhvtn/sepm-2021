import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        textTransform: "none"
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20
    },
    root: {
        padding: theme.spacing(3, 2)
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        width: 400
    }
}))
