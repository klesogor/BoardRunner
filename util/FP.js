const S = require('sanctuary');
const maybeAsync = rejectionReason => S.maybe(Promise.reject(rejectionReason))(v => Promise.resolve(v));
const eitherAsync = S.either(v => Promise.reject(v))(v => Promise.resolve(v));
const first = arr => arr[0];
const second = arr => arr[1];
const log = v => console.log(v) || v;

module.exports = exports = { maybeAsync, eitherAsync, first, second, log }