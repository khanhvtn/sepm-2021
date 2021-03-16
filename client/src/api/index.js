import axios from 'axios';

const urlVoucher = 'http://localhost:5000/api/vouchers';

export const fetchVouchers = () => axios.get(urlVoucher);
export const createVoucher = (newVoucher) => axios.post(urlVoucher, newVoucher);
export const updateVoucher = (id, updateVoucher) =>
    axios.patch(`${urlVoucher}/${id}`, updateVoucher);
export const deleteVoucher = (id) => axios.delete(`${urlVoucher}/${id}`);




const urlBrand = 'http://localhost:5000/api/brands';
export const fetchBrands = () => axios.get(urlBrand);
export const createBrand = (newBrand) => axios.post(urlBrand, newBrand);
export const updateBrand = (id, updateBrand) =>
    axios.patch(`${urlBrand}/${id}`, updateBrand);
export const deleteBrand = (id) => axios.delete(`${urlBrand}/${id}`);