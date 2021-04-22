import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import { getVouchersByCategory } from '../../actions/vouchers'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Grid, Typography } from '@material-ui/core'
import VoucherItem from './VoucherItem'

const VoucherList = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const cat = location.state.category;
    const fetchVouchers = async () => {
        const results = await axios.get(`/api/vouchers/category/${cat}`)
        setVouchers(results.data)
        if(vouchers.length == 0) {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchVouchers();
    }, [cat]);

 


    
   

    return vouchers.length == 0 ? (
        <>
            {loading ?
                <img src="https://www.dailymusicroll.com/wp-content/themes/viral/images/loadingSpinner.gif?x31303" />
                : <Typography className={classes.vouchers} variant="h5">
                    No Vouchers
                    </Typography>}
        </>
    ) : (
        <Grid item xs={12} md={12}>
            <Grid container justify="center" spacing={2}>
                {vouchers.filter(voucher => new Date(voucher.expiredDate).getTime() >= Date.now() && new Date(voucher.startedDate).getTime() <= Date.now() ).map((voucher) => (
                    <Grid
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={voucher._id}
                        item
                    >
                        <VoucherItem voucher={voucher}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )


}

export default VoucherList;
