import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { CardActions, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Banner = ({ isBannerStatus, brandInfo }) => {
    const classes = useStyles();
    const [displayCardMedia, setDisplayCardMedia] = useState(true)
    const { title, description, button, image, brand, isBanner } = isBannerStatus

    const readFullDescription = () => {
        setDisplayCardMedia(!displayCardMedia)
    }

    return (
        <>
            <Card className={classes.root}>
                <div className={displayCardMedia ? classes.details : classes.detailsNoMedia}>
                    <CardActions className={classes.branding}>

                        <CardMedia
                            className={classes.brandImageCover}
                            image={brandInfo.brandImage}
                            title="Live from space album cover"
                        />


                    </CardActions>



                    <CardContent className={classes.description}>

                        {displayCardMedia ?
                            <>
                                <Typography className={classes.title} component="h6" variant="h6">
                                    {brandInfo.name}
                                </Typography>
                                <Typography variant="body1" className={classes.brandDesc}>
                                    {brandInfo.description}
                                </Typography>
                            </>

                            :
                            <>
                                <Typography className={classes.title} component="h6" variant="h6">
                                    {brandInfo.name}
                                </Typography>
                                <Typography variant="body1" className={classes.brandDesc1}>
                                    {brandInfo.description}
                                </Typography>
                            </>

                        }
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
                {displayCardMedia ?
                    <CardMedia
                        className={classes.cover}
                        image={brandInfo.coverImage}
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