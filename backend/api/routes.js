const express = require("express");
const router = express.Router();

router.post('/yo', (request, response) => {
    response.send("Hey from post");
});

module.exports = router;