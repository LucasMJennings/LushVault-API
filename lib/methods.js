const lushVault = require('../startup/blockchain.js');

async function getSaleTokenIds() {
    let tokenIds = await lushVault.methods.getTokensForSale().call();
    return tokenIds;
}

async function getTokenPrice(tokenData) {
    let result = [];
    for (i = 0; i < tokenData.length; i++) {
        let tokenPrice = await lushVault.methods.getTokenPrice(tokenData[i].token_id).call();
        result.push(
            {
                "token_id": tokenData[i].token_id,
                "data": tokenData[i].data,
                "price": tokenPrice
            }
        );
    }
    return result;
}

async function getTokensForAccount(accountId) {
    let tokenIds = await lushVault.methods.getTokensForAddress(accountId).call();
    return tokenIds;
}

async function getTokenOwner(tokenId) {
    let owner = await lushVault.methods.ownerOf(tokenId).call();
    return owner;
}

exports.getSaleTokenIds = getSaleTokenIds;

exports.getTokenPrice = getTokenPrice;

exports.getTokensForAccount = getTokensForAccount;

exports.getTokenOwner = getTokenOwner;