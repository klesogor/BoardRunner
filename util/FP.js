const S = require('sanctuary');
const maybeAsync = rejectionReason => S.maybe(Promise.reject(rejectionReason))(v => Promise.resolve(v));
const eitherAsync = S.either(v => Promise.reject(v))(v => Promise.resolve(v));

module.exports = exports = {maybeAsync, eitherAsync}