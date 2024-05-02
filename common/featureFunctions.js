const featureFunctions = {}

featureFunctions.getPathCount = (paths) =>{
    return paths.length;
}

featureFunctions.getPointCount = (paths) =>{
    return paths.flat().length;
}

if (typeof module !== 'undefined'){
    module.exports=featureFunctions;
}