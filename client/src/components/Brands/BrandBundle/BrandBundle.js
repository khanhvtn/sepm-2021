import React from 'react'
import useStyles from './styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid, CardActionArea } from '@material-ui/core';


const BrandBundle = () => {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.description} component="h6" variant="h6">
                            Only a couple days left... ⌛What shoes are you buying with our 30% discount?!
                        </Typography>

                        <CardContent>
                            <Grid item xs={12} md={12}>
                                <Grid container justify="center" spacing={2}>
                                    {[0, 1, 2, 3].map((value) => (
                                        <Grid xs={12} sm={6} md={6} lg={6} xl={6} key={value} item>
                                            <Card className={classes.innerRoot}>
                                                <CardActionArea>
                                                    <CardMedia

                                                        className={classes.cover}
                                                        image="https://gigamall.com.vn/data/2019/09/20/14295359_Trung-t%C3%A2m-th%C6%B0%C6%A1ng-m%E1%BA%A1i-GIGAMALL-SUMO-YAKINUKU-1.jpg"
                                                        title="Live from space album cover"
                                                    />
                                                </CardActionArea>
                                                <CardContent className={classes.content1}>
                                                    <Typography className={classes.body} component="h6" variant="h6">
                                                        Buffet Trọn Gói
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardContent>
                </div>
            </Card>
        </>
    )
}

export default BrandBundle;
