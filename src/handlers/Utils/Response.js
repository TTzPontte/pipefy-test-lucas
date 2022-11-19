const  Response =(status=200, data)=>( {
    statusCode: status,
    body: JSON.stringify(data),
});

module.exports = {Response}