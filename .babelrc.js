module.exports= function (api){
    api.cache(true);
    const presets = [];
    presets.push("@babel/preset-env");
    presets.push("@babel/preset-react");
    return {presets};
}