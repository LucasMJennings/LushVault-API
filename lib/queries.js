const sql = require('../startup/database.js');
const crypto = require('crypto');

async function queryByTokenId(tokenId) {
    try {
        let queryResult = await sql`select data from main.metadata where token_id = ${tokenId}`;
        return queryResult[0].data;
    } catch (err) {
        console.log(`Error querying for token ID: ${tokenId}`);
        return;
    }
}

async function queryNonce(tokenId) {
    try {
        let queryResult = await sql`select nonce from main.nonces where token_id = ${tokenId}`;
        return queryResult[0].nonce;
    } catch (err) {
        console.log(`Error querying nonce for token ID: ${tokenId}`);
        return;
    }
}

async function queryByCreatorName(creatorName) {
    try {
        let queryResult = await sql`select token_id, data from main.metadata where data ->> 'creator' = ${creatorName}`;
        return queryResult;
    } catch (err) {
        console.log(`Error querying for creator: ${creatorName}`);
        return;
    }
}

async function queryByTokenIds(tokenIds) {
    try {
        let queryResult = await sql`select token_id, data from main.metadata where token_id in ${sql(tokenIds)}`;
        return queryResult
    } catch (err) {
        console.log(`Error querying for token IDs: ${tokenIds}`);
        return;
    }
}

async function getAllTokenIds() {
    try {
        let queryResult= await sql`select token_id from main.metadata`;
        // let token_id = queryResult.map(queryResult => {return queryResult.token_id});
        let token_id = queryResult;
        return token_id;
    } catch (err) {
        console.log(`Error querying getAllTokenIds()`);
        return;
    }
}

async function getAllTokenMetadata() {
    try {
        let queryResult= await sql`select token_id, data from main.metadata`;
        return queryResult;
    } catch (err) {
        console.log(`Error querying getAllTokenMetadata()`);
        return;
    }
}

async function queryAssetData(tokenId) {
    try {
        let queryResult = await sql`select url from main.assets where token_id = ${tokenId}`;
        return queryResult;
    } catch (err) {
        console.log(`Error fetching asset for token id: ${tokenId}`);
        return;
    }
}

async function updateNonce(tokenId) {
    try {
        let newNonce = crypto.randomBytes(16).toString('base64');
        await sql`update main.nonces set nonce = ${newNonce} where token_id = ${tokenId}`;
        return;
    } catch (err) {
        console.log(err);
        console.log(`Error updating nonce for token id: ${tokenId}`);
        return;
    }
}

exports.queryByTokenId = queryByTokenId;

exports.queryNonce = queryNonce;

exports.queryAssetData = queryAssetData;

exports.queryByTokenIds = queryByTokenIds;

exports.getAllTokenIds = getAllTokenIds;

exports.getAllTokenMetadata = getAllTokenMetadata;

exports.updateNonce = updateNonce;

exports.queryByCreatorName = queryByCreatorName;
