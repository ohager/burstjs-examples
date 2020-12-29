const {sha256} = require('js-sha256')
const {convertHexEndianess, convertHexStringToByteArray} = require('@burstjs/util')

function performSHA256(hexMessage) {
    const fullMessage = `${hexMessage}${hexMessage}00000000000000000000000000000000`
    return sha256(convertHexStringToByteArray(fullMessage))
}

(() => {
    const hash = performSHA256("0c022fe8eec857110");
    console.info('Hash', hash.substr(0, 16))
    console.info('Hash', convertHexEndianess(hash.substr(0, 16)))


})();
