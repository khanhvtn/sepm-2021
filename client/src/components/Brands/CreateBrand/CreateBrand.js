import { Container, Grow, Grid } from '@material-ui/core';
import BrandForm from '../../Form/BrandForm/BrandForm';
import Brands from '../Brands';
import useStyles from './styles';
import { getBrands } from '../../../actions/brands';
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';


const CreateBrand = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getBrands());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid
                    className={classes.mainContainer}
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={12} md={8}>
                        <Brands setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <BrandForm
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default CreateBrand;
