import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Vouchers from '../Vouchers';
import Form from '../../Form/Form';
import useStyles from './styles';
const CreateVoucher = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
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
                        <Vouchers setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default CreateVoucher;
