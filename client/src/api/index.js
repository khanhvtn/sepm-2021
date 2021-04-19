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
export const fetchVouchersByCategory = () => API.get(`/vouchers/category/${cat}`);

export const createVoucher = (newVoucher) => API.post('/vouchers', newVoucher);
export const updateVoucher = (id, updateVoucher) =>
    API.patch(`${'/vouchers'}/${id}`, updateVoucher);
export const deleteVoucher = (id) => API.delete(`${'/vouchers'}/${id}`);

// API for User
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const checkCurrentUser = () => API.get(`/user/checkCurrentUser`);
export const updateUser = (newUser) =>
    API.patch(`/user/${newUser._id}`, newUser);

// API for Brand
export const fetchBrands = () => axios.get('/brands');
export const createBrand = (newBrand) => axios.post('/brands', newBrand);
export const updateBrand = (id, updateBrand) =>
    axios.patch(`${'/brands'}/${id}`, updateBrand);
export const deleteBrand = (id) => axios.delete(`${'/brands'}/${id}`);

//API for History
export const fetchHistories = () => API.get('/histories');
export const createHistory = (newHistory) => API.post('/histories', newHistory);
export const deleteHistory = (id) => API.delete(`/histories/${id}`)
