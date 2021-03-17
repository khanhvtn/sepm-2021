import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '0 24px 24px 24px',
        flexDirection: 'column',
    },
    innerRoot: {
        backgroundColor: "#f2f2f2"

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },

    content: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1),
    },

    content1: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1),
        textAlign: 'center',
        marginBottom: 20
        
    },

    description: {
        fontWeight: 'bold',
      
    },
    cover:{
        width: '100%',
        height: '100%',
        paddingTop: '56.25%', // 16:9,
    },
    body:{
        fontSize: 15
    }
    

}));