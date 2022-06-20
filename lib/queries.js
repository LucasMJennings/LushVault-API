const sql = require('../startup/database.js');

async function queryByTokenId(tokenId) {
    try {
        let queryResult = await sql`select data from main.metadata where token_id = ${tokenId}`;
        return queryResult[0].data;
    } catch (err) {
        console.log(`Error querying for token ID: ${tokenId}`);
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

exports.queryByTokenId = queryByTokenId;

exports.queryByTokenIds = queryByTokenIds;

exports.getAllTokenIds = getAllTokenIds;

exports.getAllTokenMetadata = getAllTokenMetadata;
