import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${window.location.protocol}//localhost:3010/api/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const $get = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const $post = async (url, data = {}) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const $put = async (url, data = {}) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const $delete = async (url, data = {}) => {
    try {
        const response = await axiosInstance.delete(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { $get, $post, $put, $delete };
