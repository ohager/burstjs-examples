const {BurstService} = require("@burstjs/core");
const {generateMasterKeys, getAccountIdFromPublicKey} = require("@burstjs/crypto");
const {convertNumberToNQTString, convertNumericIdToAddress} = require("@burstjs/util");
const {signAndBroadcastTransaction} = require("@burstjs/core/out/internal");

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

async function send({
                      amountPlanck,
                      feePlanck,
                      senderPublicKey,
                      senderPrivateKey,
                      recipientId,
                      recipientPublicKey,
                      deadline
                    }) {
  let parameters = {
    amountNQT: amountPlanck,
    publicKey: senderPublicKey,
    recipient: recipientId,
    recipientPublicKey: recipientPublicKey,
    feeNQT: feePlanck,
    deadline: 1440,
  };

  const service = new BurstService({
    apiRootUrl: '/burst',
    nodeHost: 'http://testnet.burstcoin.network:6876',
  });

  const {unsignedTransactionBytes: unsignedHexMessage} = await service.send('sendMoney', parameters);

  return signAndBroadcastTransaction({
    senderPublicKey,
    senderPrivateKey,
    unsignedHexMessage
  }, service);
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

    await send({
      amountPlanck: convertNumberToNQTString(amount),
      feePlanck: convertNumberToNQTString(0.1),
      senderPublicKey: senderKeys.publicKey,
      senderPrivateKey: senderKeys.signPrivateKey,
      recipientId: recipientId,
      recipientPublicKey: publickey,
    });

  } catch (e) {
    handleApiError(e)
  }
}

(async () => {
  const answers = await askSendInformation();
  await sendBurst(answers);
})();