import React from 'react';
import useStyles from './styles';

const VoucherDetail = ( { voucher }) => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <div className={displayCardMedia ? classes.details : classes.detailsNoMedia}>
                    <CardActions className={classes.branding}>
                        <Link to="/brand">
                            <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                        </Link>
                        <Typography className={classes.title} component="h6" variant="h6">
                            {voucher.name}
                        </Typography>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} component="h5" variant="h5">
                            Student now get 6% free month {title}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.description}>
                        <Typography variant="body1" className={classes.brandDesc}>
                            Description
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Button className={classes.getButton} variant="outlined" color="primary">
                            Purchase
                        </Button>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://source.unsplash.com/featured/?macbook"
                    title="Live from space album cover"
                />
            </Card>
        </>
    )
}