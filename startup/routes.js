const express = require('express');
const metadata = require('../routes/metadata.js');
const tokens = require('../routes/tokens.js');
const cors = require('cors');

module.exports = function(app) {
    app.use(express.json());
    app.use(cors());
    app.use('/api/metadata', metadata);
    app.use('/api/tokens', tokens);
}