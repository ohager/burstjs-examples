const {generateMasterKeys} = require("@burstjs/crypto");
const {BurstValue, convertNumericIdToAddress} = require("@burstjs/util");

const {handleApiError} = require('./helper');
const inquirer = require('inquirer');
const api = require("./helper/api")

/**
 * Just a helper function to ask for the account id/address
 */
function askSendInformation() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'accountId',
        message: 'Please enter the recipients accountId?'
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

async function createSubscription({amount, accountId: recipientId, passphrase}) {
  try {
    const senderKeys = generateMasterKeys(passphrase);

    const {confirmed} = await confirm({recipientId, recipientAddress: convertNumericIdToAddress(recipientId)});
    if (!confirmed) {
      console.info('Aborted');
      process.exit(-1);
      return
    }

    await api.transaction.createSubscription({
      frequency: 3600,
      amountPlanck: BurstValue.fromBurst(amount).getPlanck(),
      feePlanck: BurstValue.fromBurst(0.1).getPlanck(),
      senderPublicKey: senderKeys.publicKey,
      senderPrivateKey: senderKeys.signPrivateKey,
      recipientId,
    });

  } catch (e) {
    handleApiError(e)
  }
}

(async () => {
  const answers = await askSendInformation();
  await createSubscription(answers);
})();
