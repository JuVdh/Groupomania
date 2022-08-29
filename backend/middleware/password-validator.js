// Use of Password Validator package to validate password according to properties added to the schema created below
const passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd1', 'Password123']);

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)){
        return res.status(400).json({message: 'please enter a secure password with at least 8 characters including 2 numbers and without spaces' });
    } else {
        next();
    }
 };