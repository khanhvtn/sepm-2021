import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        const token = JSON.parse(localStorage.getItem('userProfile')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});


// API for Voucher
export const fetchVouchers = () => API.get('/vouchers');
export const createVoucher = (newVoucher) => API.post('/vouchers', newVoucher);
export const updateVoucher = (id, updateVoucher) =>
    API.patch(`${'/vouchers'}/${id}`, updateVoucher);
export const deleteVoucher = (id) => API.delete(`${'/vouchers'}/${id}`);

// API for User
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUser = (id) => API.get(`/user/${id}`);

// API for Brand
export const fetchBrands = () => API.get('/brands');
export const createBrand = (newBrand) => API.post('/brands', newBrand);
export const updateBrand = (id, updateBrand) =>
    API.patch(`${'/brands'}/${id}`, updateBrand);
export const deleteBrand = (id) => API.delete(`${'/brands'}/${id}`);
