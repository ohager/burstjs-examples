const {sha256} = require('js-sha256')
const {convertHexEndianess, convertHexStringToByteArray} = require('@burstjs/util')
const {BigNumber} = require('bignumber.js')

function performSHA256(hexMessage) {
    const fullMessage = `${hexMessage}${hexMessage}00000000000000000000000000000000`
    return sha256(convertHexStringToByteArray(fullMessage))
}

(() => {
    // put here your message you got from CryptoBall
    const hash = performSHA256("0c022fe8eec857110");

    // this is the 64 long in hex representation
    const hexNumber = hash.substr(0, 16)
    // this is the 64 long in hex representation as Little Endian
    const hexNumberLE = convertHexEndianess(hexNumber)

    console.info('Hash:', hexNumber)
    console.info('Hash(LE):', hexNumberLE)

    // Now we use an external lib (native BigInt is not supported in all browsers yet) called BigNumber
    // https://www.npmjs.com/package/bignumber.js
    // for your project download/save the following file and add it manually
    // https://raw.githubusercontent.com/MikeMcl/bignumber.js/master/bignumber.min.js
    const b = new BigNumber(`0x${hexNumber}`)
    console.log('Big Number:', b.toString())
    console.log('Mod 69:', b.mod(69).toString())

    // Remember... never ever try to convert to Number, if you cannot guarantee that a value is greater than 2^53
    // Do all the mathematical operations using the BigNumber lib.

})();
