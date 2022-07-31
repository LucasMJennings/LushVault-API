const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const queries = require('../lib/queries.js');

router.get('/:creatorName', async(req, res) => {
    const creatorName = req.params.creatorName;
    let tokenData;
    try {
        let queryResult =  await queries.queryByCreatorName(creatorName);
        tokenData = queryResult;       
    } catch (err) {
        console.log(`DB Query for creator tokens failed: ${err}`);
        res.status(500).send('Uh oh, something went wrong...');
    }
    res.status(200).send(tokenData);
})

module.exports = router;