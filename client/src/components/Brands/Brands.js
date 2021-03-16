import React, {useEffect, useState} from 'react';
import Brand from './Brand/Brand';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';


const Brands = ({ setCurrentId }) => {
    const classes = useStyles();
    const brands = useSelector(state => state.brands);
    console.log(brands)
    

    return !brands.length ? (
        <Grid container direction="column" alignItems="stretch">
            <Grid item style={{ textAlign: 'center' }}>
                <CircularProgress variant="indeterminate" />
            </Grid>
        </Grid>
    ) : (
        <Grid
            className={classes.container}
            container
            alignItems="center"
            direction="row"
            spacing={3}
        >
            {brands.map((brand, index) => (
                <Grid xs={12} sm={6} md={6} lg={6} xl={6} key={index} item>
                    <Brand brand={brand} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Brands;
