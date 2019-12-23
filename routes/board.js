const express = require('express');

const mockBoard = {
    name: "Mock board",
    columns: [
        {
            name: "test",
            tickets: [
                {
                    name: "Test ticket"
                }
            ]
        }
    ]
}

const boardController = () => {
    const router = express.Router();

    router.get(':id', (req, res) => res.status(200).send(mockBoard));
    router.post(':id', (req, res) => res.status(200).send(mockBoard));
    router.all('*', (req, res) => res.status(200).send(mockBoard));

    return router;
}

module.exports = exports = boardController;