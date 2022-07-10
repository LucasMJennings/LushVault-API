const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const lushVault = require('../startup/blockchain.js');
const queries = require('../lib/queries.js');
const methods = require('../lib/methods.js');

router.get('/:tokenId', async(req, res) => {
    let getNonce = req.query.nonce === 'true';
    let getPrice = req.query.price === 'true';
    let getOwner = req.query.owner === 'true';
    const tokenId = req.params.tokenId;
    let nonce;
    let price;
    let owner;
    let tokenData;
    try {
        let queryResult =  await queries.queryByTokenId(tokenId);
        tokenData = queryResult;       
    } catch (err) {
        console.log(`DB Query for token metadata failed: ${err}`);
        res.status(500).send('Uh oh, something went wrong...');
    }
    if (getOwner) {
        owner = await methods.getTokenOwner(tokenId);
        tokenData.owner = owner;
    }
    if (getPrice) {
        let priceList = await methods.getTokenPrice([{"token_id": tokenId}]);
        price = priceList[0].price;
        tokenData.price = price;
    }
    if (getNonce) {
        nonce = await queries.queryNonce(tokenId);
        tokenData.nonce = nonce;
    }
    res.status(200).send(tokenData);
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