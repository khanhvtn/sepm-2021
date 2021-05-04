import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        const token = JSON.parse(localStorage.getItem('userProfile')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    if (localStorage.getItem('admin')) {
        const token = JSON.parse(localStorage.getItem('admin')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    if (localStorage.getItem('brandProfile')) {
        const token = JSON.parse(localStorage.getItem('brandProfile')).token;
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
export const userWinGame = (newUpdateUser) =>
    API.post(`/user/wingame`, newUpdateUser);

// API for Brand
export const fetchBrands = () => API.get('/brands');
export const signInBrand = (formData) => API.post('/brands/signin', formData)
export const signUpBrand = (formData) => API.post('brands/signup', formData)
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
export const fetchAcceptedVouchers = () => API.get('/admin/acceptedVouchers');
export const fetchPublishedVouchers = () => API.get('/admin/publishedVouchers');
export const setVoucherPublish = (id, action) => API.patch(`admin/publishVoucher/${id}`, action)

//API for History
export const fetchHistories = () => API.get('/histories');
export const createHistory = (newHistory) => API.post('/histories', newHistory);
export const deleteHistory = (id) => API.delete(`/histories/${id}`)

// API for Link
export const createShareLink = (voucherId) => API.post('/links', voucherId);
export const accessLink = (id, validToken) => API.post(`/links/${id}`, validToken);
export const trackUser = (clientToken) => API.post('/links/track/user', clientToken);