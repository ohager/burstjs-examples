const {convertAddressToNumericId, isBurstAddress} = require("@burstjs/util");

// we check if incoming account is either a BURST Address, or Numeric Id
// eventually, we convert to Numeric Id

function ensureAccountId(idOrAddress){
    return  isBurstAddress(idOrAddress) ? convertAddressToNumericId(idOrAddress) : idOrAddress;
}

module.exports = ensureAccountId
