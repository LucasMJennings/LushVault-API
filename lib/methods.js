const lushVault = require('../startup/blockchain.js');

async function getSaleTokenIds() {
    console.log('Begin');
    let tokenIds = await lushVault.methods.getTokensForSale().call();
    console.log(tokenIds);
    return tokenIds;
}

exports.getSaleTokenIds = getSaleTokenIds;