import useStyles from './styles';
import PropTypes from 'prop-types';
import { CardActions, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'react'

const Banner = (props) => {
    const classes = useStyles();
    const [displayCardMedia, setDisplayCardMedia] = useState(true)
    const { title, description, button, image, brand, isBanner } = props
    console.log(isBanner)

    
    const readFullDescription = () => {
        setDisplayCardMedia(!displayCardMedia)
    }
    

    return (
        <>
            <Card className={classes.root}>
                <div className={displayCardMedia ? classes.details : classes.detailsNoMedia}>
                    <CardActions className={classes.branding}>
                        <Link href="/brand">
                            <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                        </Link>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} component="h5" variant="h5">
                            Student now get 6% free month {title}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.description}>
                        <Typography className={classes.textDescription} variant="subtitle1" color="textSecondary">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. {description}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        {isBanner ?
                            <Button className={classes.getButton} variant="outlined" color="primary">
                                Get now {button}
                            </Button>
                        :
                            <Link className={classes.readMore} onClick={readFullDescription} href="#">
                                {displayCardMedia ? `Read more` : `Read less`}
                            </Link>
                        }
                    </div>
                </div>
                { displayCardMedia ? 
                    <CardMedia
                        className={classes.cover}
                        image="https://source.unsplash.com/featured/?macbook"
                        title="Live from space album cover"
                    />
                    : null
                }
            </Card>
        </>
    );
};

export default Banner;

Banner.prototype = {
    title: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.string,
    image: PropTypes.string,
    brand: PropTypes.string,
    isBanner: PropTypes.bool
}