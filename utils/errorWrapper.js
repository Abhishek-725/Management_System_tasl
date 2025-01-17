module.exports = (func) => {
    return (req,res,next) => {
        func(req,res,next).catch((error) => {
            console.log('Error : ',error);
            next(error);
        })
    }
}