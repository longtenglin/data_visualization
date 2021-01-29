import axios from "axios";

const BASEURL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_URL : "/test";
const service = axios.create({
    baseURL: BASEURL,
    timeout: 30000
});

service.interceptors.request.use( (config)=>{
    // config.headers["token"] = getToken()
    config.headers["authorizationToken"] = "abcd1234";
    return config;
}, (error) => {
    console.error("error",error);
    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    return Promise.resolve(response);
}, (error) => {
    console.error("error",error);
    return Promise.reject(error);
});

export default service;