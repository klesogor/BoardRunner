const Connection = require('./util/db');
const bootstrap = (env) => {
    return Promise.all([
        Connection.connect(env.MONGO_CONNECTION),
        Promise.resolve(env.PORT || 8080)
    ]);
}

module.exports = exports = bootstrap;