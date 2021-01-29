import cookie from "cookie_js";

export const setToken = ((token)=>{
    cookie.set("authorizationToken",token);
});

export const getToken = (() => {
    return cookie.get("authorizationToken");
});

export const setMac = (val) => {
    cookie.set("mac", val);
};

export const getMac = () => {
    return cookie.get("mac");
};