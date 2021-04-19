import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import {getVouchersByCategory} from '../../actions/vouchers'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const VoucherList = (props) => {
    const classes = useStyles();
    const [vouchers, setVouchers] = useState([]);
    const fetchVouchers = async() => {
        const results = await axios.get(`/api/vouchers/category/beauty`)
        setVouchers(results.data.vouchers)
    }

    useEffect(() => {
        fetchVouchers();
      }, []);

    // useEffect(() => {
    //     ();
    //   }, [id]);
    return (
        <div>
            
        </div>
    )
}

export default VoucherList;
