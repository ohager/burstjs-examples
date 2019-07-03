const {isBurstAddress, convertAddressToNumericId} = require("@burstjs/util");

const getAccountId = account => isBurstAddress(account) ?
	convertAddressToNumericId(account) :
	account;


module.exports = getAccountId;
