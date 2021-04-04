import {makeStyles} from '@material-ui/core'

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '0 24px 24px 24px',

    },


    detailWithMedia: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    brand: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
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

    desc: {
        flex: '1 0 auto',
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },

    

    voucherDesc: {
        width: 300,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 6,
        "-webkit-box-orient": "vertical",
        fontSize: 16
    },

    voucherDesc1: {
        width: 300,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 6,
        "-webkit-box-orient": "vertical",
        fontSize: 20,
        color: "#2f5ade",
        fontWeight: "bold"
    },


    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

    getButton: {
        border: '2px solid',
        fontWeight: 'bold',
    },
    cover: {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9,
    },

    clock:{
        display: "flex",
        justifyContent: "spaceAround",
        textAlign: "center",
        paddingTop: 10
        
    }

    
}))