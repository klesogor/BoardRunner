const JOI = require('@hapi/joi');

const BoardDTO = JOI.object({
    name: JOI.string().min(5).required()
});

module.exports = {BoardDTO};