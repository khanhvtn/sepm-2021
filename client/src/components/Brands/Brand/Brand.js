import useStyles from './styles';
import { CardActions, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const Brand = ({ brand, setCurrentId }) => {
    const classes = useStyles();

    return (
        <>
            { !brand ?
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                            <Link href="/brand">
                                <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                            </Link>
                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} component="h5" variant="h5">
                                Student now get 6% free month
                        </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <Button className={classes.getButton} variant="outlined" color="primary">
                                Get now
                        </Button>
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image="https://source.unsplash.com/featured/?macbook"
                        title="Live from space album cover"
                    />
                </Card>
                :
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardActions className={classes.branding}>
                            <Link href="/brand">
                                <Avatar className={classes.logo} alt='logo' src={brand.image} />
                            </Link>
                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography className={classes.title} component="h5" variant="h5">
                                {brand.title}
                        </Typography>
                        </CardContent>
                        <CardContent className={classes.description}>
                            <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                                {brand.description}
                        </Typography>
                        </CardContent>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={brand.image}
                        title={brand.title}
                    />
                </Card>
            }

        </>
    );
};

export default Brand;