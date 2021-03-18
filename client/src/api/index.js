import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        const token = JSON.parse(localStorage.getItem('userProfile')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchVouchers = () => API.get('/vouchers');
export const createVoucher = (newVoucher) => API.post('/vouchers', newVoucher);
export const updateVoucher = (id, updateVoucher) =>
    API.patch(`${'/vouchers'}/${id}`, updateVoucher);
export const deleteVoucher = (id) => API.delete(`${'/vouchers'}/${id}`);

//API for User
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (newUser) =>
    API.patch(`/user/${newUser._id}`, newUser);
