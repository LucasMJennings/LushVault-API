const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const queries = require('../lib/queries.js');

router.get('/:tokenId', async(req, res) => {
    try {
        let tokenId = req.params.tokenId;
        let queryResult =  await queries.queryByTokenId(tokenId);
        res.status(200).send(queryResult);
    } catch (err) {
        console.log(`DB Query for token metadata failed: ${err}`);
        res.status(500).send('Uh oh, something went wrong...');
    }
})

router.patch('/', async(req, res) => {
    try {
        let tokenIds = req.body.tokenIds;
        let queryResult = await queries.queryByTokenIds(tokenIds);
        res.status(200).send(queryResult);
    } catch(err) {
        console.log(`DB Query for token metadata failed: ${err}`);
        res.status(500).send('Uh oh, something went wrong...');
    }
})



module.exports = router;