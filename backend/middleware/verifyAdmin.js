const verifyAdmin = (req, res, next) => {
    if(req?.role === "admin"){
        next();
    } else {
        return res.status(401).json({message : "Unauthorized user!"})
    };
}

module.exports = verifyAdmin