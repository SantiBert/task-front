import { SERVER_URL } from '../constants/global';
import axios from 'axios';
import Cookies from "js-cookie";


export const signupService = async (data) => {
    try {
        let url = `${SERVER_URL}auth/signup/`;
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        return error.response
    }
  };

export const loginService = async (data) => {
    try {
        let url = `${SERVER_URL}auth/login/`;
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        return error.response
    }
};

export const logoutService = async () => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
        let url = `${SERVER_URL}auth/logout/`;
        const response = await axios.post(url);
        return response;
    } catch (error) {
        return error.response
    }
};

export const loginRefreshService = async (data) => {
    try {
        let url = `${SERVER_URL}auth/login/refresh/`;
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        return error.response
    }
};

export const verifyTokenRequest = async () => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}auth/verify-token/`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        return error.response
    }
};