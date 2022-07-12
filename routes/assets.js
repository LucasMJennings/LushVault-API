const express = require("express");
const router = express.Router();
const sql = require('../startup/database.js');
const lushVault = require('../startup/blockchain.js');
const queries = require('../lib/queries.js');
const methods = require('../lib/methods.js');
const bops = require('bops');
const fs = require('fs');
require('dotenv').config()
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = process.env.BUCKET;
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));

router.post('/:tokenId', async(req, res) => {
    const tokenId = req.params.tokenId;
    const signedMessage = req.body.signature;
    if (!tokenId || !signedMessage) {
        res.status(400).send('Invalid request');
    }
    const tokenOwner = await methods.getTokenOwner(tokenId);
    if (!tokenOwner) {
        res.status(400).send('Invalid token owner');
    }
    const nonce = await queries.queryNonce(tokenId);
    if (!nonce) {
        res.status(400).send('Invalid nonce');
    }
    const msg = `0x${bops.from(nonce, 'utf8').toString('hex')}`;
    const userAddress = web3.eth.accounts.recover(msg, signedMessage);
    if (!userAddress) {
        res.status(400).send('Failed to verify signature');
    }
    if (userAddress.toLowerCase() === tokenOwner.toLowerCase()) {
        const assetUrl = await queries.queryAssetData(tokenId);
        const extension = assetUrl[0].url.split(".").reverse()
        await storage.bucket(bucket).file(assetUrl[0].url).download({destination: `./routes/tmp/${nonce}.${extension[0]}`});
        res.sendFile(path.resolve(`/tmp/${nonce}.${extension[0]}`), { root: __dirname });
        try {
            setTimeout(() => {fs.unlinkSync(path.resolve(`./routes/tmp/${nonce}.${extension[0]}`))}, 5000);
            queries.updateNonce(tokenId);
        } catch (err) {
            console.log(err);
        }

    } else {
        res.status(403).send(`You don't own this token!`);
    }
})

module.exports = router;