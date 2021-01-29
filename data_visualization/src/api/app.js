import service from "../utils/request"

export const GetToken = (data) =>{
    return service.request({
        method: "GET",
        url: "/api/iot/token/",
        data: data
    })
};

export const GetSensors = ()=>{
    return service.request({
        method: "GET",
        url:"/api/iot/sensors/",
    })
};

export const GetOneLateData = (macAddress) => {
    return service.request({
        method: "GET",
        url: "/api/iot/sensors/"+macAddress+"/data/latest/",
    })
};

export const GetSomeLateData = (macAddress) =>{
    return service.request({
        method: "GET",
        url: "/api/iot/sensors/"+ macAddress + "/data/latest",
    })
};

export const GetOneHistoryData = (data) =>{
    return service.request({
        method: "GET",
        url: "/api/iot/sensors/"+data.macts+"/data/history?startts="+data.startts+"&endts="+data.endts,
    })
};
