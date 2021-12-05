const {composeApi} = require("@burstjs/core");
const {generateMasterKeys, getAccountIdFromPublicKey} = require("@burstjs/crypto");
const {convertNumberToNQTString, convertNumericIdToAddress} = require("@burstjs/util");

const {handleApiError} = require('./helper');

//

const inquirer = require('inquirer');

/**
 * Just a helper function to ask for the account id/address
 */
function askSendInformation() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'publickey',
        message: 'Please enter the recipients public key?'
      },
      {
        type: 'input',
        name: 'amount',
        message: 'Please enter the amount in Burst?'
      },
      {
        type: 'input',
        name: 'passphrase',
        message: 'Please enter your passphrase?'
      }
    ])
}

function confirm({recipientId, recipientAddress}) {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'confirmed',
    message: `Recipient: ${recipientId} - ${recipientAddress}. Is it correct?`
  }])
}

async function sendBurst({amount, publickey, passphrase}) {
  try {
    const recipientId = getAccountIdFromPublicKey(publickey);
    const senderKeys = generateMasterKeys(passphrase);

    const {confirmed} = await confirm({recipientId, recipientAddress: convertNumericIdToAddress(recipientId)});
    if (!confirmed) {
      console.info('Aborted');
      process.exit(-1);
      return
    }

    const api = composeApi({
      nodeHost: 'http://testnet.signumcoin.network:6876',
    });

    await api.transaction.sendAmountToSingleRecipient({
      amountPlanck: convertNumberToNQTString(amount),
      feePlanck: convertNumberToNQTString(0.1),
      senderPublicKey: senderKeys.publicKey,
      senderPrivateKey: senderKeys.signPrivateKey,
      recipientId: recipientId,
      recipientPublicKey: publickey, //
    });

  } catch (e) {
    handleApiError(e)
  }
}

(async () => {
  const answers = await askSendInformation();
  await sendBurst(answers);
})();
