let envConfig = function() {
    
    let liveMode = true;

    let envMode = process.env.NODE_ENV === "production";
    let productionAPI = "/";
    let developmentAPI = liveMode ? "http://127.0.0.1:4000/" : "http://127.0.0.1:3004/";
    let apiURL = envMode ? productionAPI : developmentAPI;

    return apiURL;
};

export default envConfig;