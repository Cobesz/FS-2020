const express = require('express')
    , router = express.Router();

const apiUrl = '/api/';

router.use(apiUrl + 'todos', require('./todos'));

module.exports = router;
