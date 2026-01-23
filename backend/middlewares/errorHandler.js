const errorHandler = (err, req, res, next) =>{
const status = err.status || 500;
const message = err.message || "Server Error !";
const extraDetails = err.extraDetails || "Error from Backend";

return res.status(status).json({
    message,
    extraDetails
})
}

export default errorHandler;