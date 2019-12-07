const { compose } = require('sanctuary');
const ErrorMessage =  error => response.status(code).send({ error, data: null });
const Success = response => code => data => response.status(code).send({error: null, data});
const errLense = error => error.message;
const Error = response => code => compose(error => response.status(code).send(ErrorMessage(error)) , errLense)

module.exports = exports = {Error, Success};