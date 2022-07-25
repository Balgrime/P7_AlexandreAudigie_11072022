const validator = require('validator');


module.exports =(req, res, next) => {
    const email = req.body.formValues.email;

    if(validator.isEmail(email)){
        next();
    } else {
        return res.status(400).json({message : "L'email n'est pas correctement renseigné"})
    };
}
