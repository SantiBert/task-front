import { SERVER_URL } from '../constants/global';
import axios from 'axios';
import Cookies from "js-cookie";

export const createTaskService = async payload => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}task/create/`;
        const response = await axios.post(url, payload);
        return response
    } catch (error) {
        return error.response
    }
};

export const getTasksListService = async () => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}task/list/`;
        const response = await axios.get(url);
        return response
    } catch (error) {
        return error.response
    }
};

export const getTaskService = async taskId => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}task/${taskId}/detail/`;
        const response = await axios.get(url);
        return response
    } catch (error) {
        return error.response
    }
};

export const deleteTaskService = async taskId => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}task/${taskId}/detail/`;
        const response = await axios.delete(url);
        return response
    } catch (error) {
        return error.response
    }
};

export const editTaskService = async (taskId,payload) => {
    try {
        const cookies = Cookies.get();
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.access_token}`;
        let url = `${SERVER_URL}task/${taskId}/edit/`;
        const response = await axios.put(url,payload);
        return response
    } catch (error) {
        return error.response
    }
};