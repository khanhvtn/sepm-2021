import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '0 24px 24px 24px',
        flexDirection: 'column',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    branding: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
    logo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    title: {
        fontWeight: 'bold',
        color: "#4a6fe6",
    },
    content: {
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1),
    },

    description: {
        flex: '1 0 auto',
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },

    cover: {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9,
    },

    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

    getButton: {
        border: '3px solid',
        fontWeight: 'bold',
        color: "#4a6fe6",
        '&:hover': {
            color: "#1243de",
          },

    },

    [theme.breakpoints.down('sm')]: {
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        logo: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        details: {
            width: '100%',
        },
        description: {
            flex: '1 0 auto',
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(0),
        },
        textDescription: {
            fontSize: 14
        },
        title: {
            fontSize: 20,
            color: "#4a6fe6",
        },
        getButton: {
            border: '2px solid',
            fontWeight: 'bold',
            fontSize: 12
        },
    },

    [theme.breakpoints.down('xs')]: {
        root: {
            display: 'flex',
            borderRadius: '0 24px 24px 24px',
            flexDirection: 'column',
            minWidth: 250,
            minHeight: 425
        },
        details: {
            width: '100%',
        },
        logo: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        title: {
            fontSize: 16,
            
        },
        description: {
            flex: '1 0 auto',
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(0),
            fontSize: 10
        },


   

    },
    chip: {
        fontStyle: "bold"
    }

    
  
  
}));