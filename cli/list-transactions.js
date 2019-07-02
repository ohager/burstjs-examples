const {composeApi} = require("@burstjs/core");
const {isBurstAddress, convertAddressToNumericId, convertNQTStringToNumber} = require("@burstjs/util");

const {_b$config} = require("./package");
const inquirer = require('inquirer');

const api = composeApi(_b$config.apiSettings);

function ask() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'account',
        message: 'What\'s the account id or address?'
      }
    ])
}


async function listTransactions(account) {

  let accountId = account;
  if (isBurstAddress(account)) {
    accountId = convertAddressToNumericId(account)
  }
  try {

    const transactions = await api.account.getAccountTransactions(accountId,
      0,
      100,
      undefined,
      undefined,
      undefined, true);

    const mappedTransactions = transactions.transactions.map(t => ({
      recipient: t.recipientRS || 'Multiple Recipients',
      value: convertNQTStringToNumber(t.amountNQT),
      fee: convertNQTStringToNumber(t.feeNQT)
    }));

    console.table(mappedTransactions, ['recipient', 'value', 'fee'])
  } catch (e) {
    console.error('Oh oh, something went wrong:',
      e.message,
      e.requestUrl
      )
  }


}

(async () => {

  // const {account} = await ask();
  const account = '6502115112683865257';
  await listTransactions(account);
})();
