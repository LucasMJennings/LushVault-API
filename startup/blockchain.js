const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));

const contract = require("../abi/LushVault.json");

const contractAddress = process.env.CONTRACT_ADDRESS;

const lushVault = new web3.eth.Contract(contract.abi, contractAddress);

web3.eth.getBlockNumber().then(console.log);

module.exports = lushVault;