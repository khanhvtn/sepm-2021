import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '0 24px 24px 24px',

    },
    brandDesc: {
        width: 300,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 6,
        "-webkit-box-orient": "vertical",
        fontSize: 16
    },
    brandImageCover: {
        borderRadius: "80%",
        width: '50%',
        height: '50%',
        paddingTop: '56.25%'
    },

    brandDesc1: {
        fontSize: 16
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    detailsNoMedia: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    branding: {
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

    root1: {
        maxWidth: 345
    },

    media: {
        width: '100%',
        height: 140,
        paddingTop: '56.25%', // 16:9,
    },

    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

    brandName: {
        color: "#e24378"
    },Button: {
        border: '2px solid',
        fontWeight: 'bold',
    },

    readMore: {
        fontWeight: 'bold'
    },

    [theme.breakpoints.down('sm')]: {
        logo: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        details: {
            display: 'flex',
            width: '60%',
        },
        description: {
            flex: '1 0 auto',
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(0),
        },
        brandDesc: {
            fontSize: 14
        },
        title: {
            fontSize: 20
        },
        getButton: {
            border: '2px solid',
            fontWeight: 'bold',
            fontSize: 12
        },
        readMore: {
            fontWeight: 'bold',
            fontSize: 12
        },
    },

    [theme.breakpoints.down('xs')]: {
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        brandDesc: {
            width: 500,
        },
        logo: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        description: {
            flex: '1 0 auto',
            paddingLeft: theme.spacing(3),
            paddingTop: theme.spacing(0),
        },
    },

}));