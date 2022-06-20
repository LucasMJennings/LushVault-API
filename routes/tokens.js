const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const lushVault = require('../startup/blockchain.js');
const queries = require('../lib/queries.js');
const methods = require('../lib/methods.js');

router.get('/', async(req, res) => {
    let getSaleTokens = req.query.sale === 'true';
    let metadata = req.query.metadata === 'true';
    let prices = req.query.prices === 'true';
    let tokenIds;
    if (!getSaleTokens && !metadata) {
        try {
            tokenIds = await queries.getAllTokenIds();
        } catch (err) {
            console.log(`DB Query for getting all tokens failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    } else if (!metadata) {
        try {
            tokenIds = await methods.getSaleTokenIds();
        } catch (err) {
            console.log(`Blockchain Query for getting sale tokens failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    }
    res.status(200).send(tokenIds);

})

module.exports = router;