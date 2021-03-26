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
export const checkCurrentUser = () => API.get(`/user/checkCurrentUser`);
export const updateUser = (newUser) =>
    API.patch(`/user/${newUser._id}`, newUser);

// API for Brand
export const fetchBrands = () => API.get('/brands');
export const signInBrands = (formData) => API.post('/brands/signin', formData)
export const signUpBrands = (formData) => API.post('brands/signup', formData)
export const createBrand = (newBrand) => API.post('/brands', newBrand);
export const updateBrand = (id, updateBrand) =>
    API.patch(`${'/brands'}/${id}`, updateBrand);
export const deleteBrand = (id) => API.delete(`${'/brands'}/${id}`);

// API for Admin
export const fetchUsers = () => API.get('/admin/users')
export const deleteUser = (id) => API.delete(`/admin/users/${id}`)
export const setVoucher = (id, action) => API.patch(`/admin/setVoucher/${id}`, action)
export const signInAdmin = (formData) => API.post('/admin/signin', formData);
export const checkCurrentAdmin = () => API.get(`/admin/checkCurrentAdmin`);

