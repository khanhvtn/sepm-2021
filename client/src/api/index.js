import axios from 'axios';

const url = 'http://localhost:5000/api/vouchers';

export const fetchVouchers = () => axios.get(url);
export const createVoucher = (newVoucher) => axios.post(url, newVoucher);
export const updateVoucher = (id, updateVoucher) =>
    axios.patch(`${url}/${id}`, updateVoucher);
export const deleteVoucher = (id) => axios.delete(`${url}/${id}`);
