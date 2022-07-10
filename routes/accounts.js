const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const lushVault = require('../startup/blockchain.js');
const queries = require('../lib/queries.js');
const methods = require('../lib/methods.js');

router.get('/:accountId', async(req, res) => {
    let metadata = req.query.metadata === 'true';
    let tokenIds = await methods.getTokensForAccount(req.params.accountId);
    let tokenData;
    if (metadata) {
        try {
            tokenData = await queries.queryByTokenIds(tokenIds);
        } catch (err) {
            console.log(`DB Query for getting token: ${tokenIds} metadata failed: ${err}`);
            res.status(500).send('Uh oh, something went wrong...');
        }
    } else {
        tokenData = [];
        for (i = 0; i < tokenIds.length; i++) {
            tokenData.push(
                {
                    "token_id": tokenIds[i]
                }
            )
        }
    }
    res.status(200).send(tokenData);

})

module.exports = router;