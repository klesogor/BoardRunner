const { MongoClient } = require('mongodb');

const Connection = {
    _connection: null,
    connect(connString){
        return MongoClient.connect(connString).then(connection => this._connection = connection || connection);
    },
    collection(name){
        return this._connection.collection(name);
    }
}

module.exports = exports = Connection;