const {ObjectId} = require('mongodb')
const save = collection => entity => {
    const { _id, ...$set } = entity;
    return collection.updateOne({ _id: _id || new ObjectId() }, { $set }, { upsert: true })
        .then(() => ({...entity, _id}));
};

module.exports = exports = { save };