const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const newUserSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    position: Joi.string()
});
const authSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
})

const NewUser = newUserSchema.validate.bind(newUserSchema);
const EncryptedPassword = user => bcrypt.hash(user.password, 'FP_RULES').then(password => ({...user,password}));
const StripedUser = ({password, ...user}) => user;
const AuthenticationRequest = authSchema.validate.bind(authSchema);
module.exports = exports = {NewUser, EncryptedPassword, AuthenticationRequest, StripedUser};