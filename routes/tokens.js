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
    let tokenData;
    if (!getSaleTokens && !metadata) {
        try {
            tokenData = await queries.getAllTokenIds();
        } catch (err) {
            console.log(`DB Query for getting all tokens failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    } else if (!getSaleTokens) {
        try {
            tokenData = await queries.getAllTokenMetadata();
        } catch (err) {
            console.log(`DB Query for getting all tokens & metadata failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    }
    else  {
        try {
            tokenIds = await methods.getSaleTokenIds();
            tokenData = [];
            for (i = 0; i < tokenIds.length; i++) {
                tokenData.push(
                    {
                        "token_id": tokenIds[i]
                    }
                )
            }
        } catch (err) {
            console.log(`Blockchain Query for getting sale tokens failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    }
    if (getSaleTokens && metadata) {
        try {
            tokenData = await queries.queryByTokenIds(tokenIds);
        } catch (err) {
            console.log(`DB Query for getting token: ${tokenIds} metadata failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    }
    if (prices) {
        try {
            tokenData = await methods.getTokenPrice(tokenData);
        } catch (err) {
            console.log(`Blockchain Query for getting token prices failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    }
    res.status(200).send(tokenData);

})

module.exports = router;