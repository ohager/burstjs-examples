const inquirer = require('inquirer');
const {composeApi} = require("@burstjs/core");
const {isBurstAddress, convertAddressToNumericId, convertNQTStringToNumber} = require("@burstjs/util");
const {_b$config} = require("./package.json");

// this is how you configure your api
// We configured the setting withing the package.json file
// of course, it can be defined in many different ways, e.g.
//
const api = composeApi(_b$config.apiSettings);

/**
 * Just a helper function to ask for the account id/address
 */
function ask() {
  // inquirer is a pretty useful lib for CLI interaction
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

  // we check if incoming account is either a BURST Address, or Numeric Id
  // eventually, we convert to Numeric Id
  const accountId = isBurstAddress(account) ?
    convertAddressToNumericId(account) :
    account;

  // All API calls are asynchronous
  // The recommended pattern is using async/await
  // This makes exception handling easy using try/catch
  try {

    // Now, we call the getAccountTransactions method,
    // but we want only the 100 most recent transactions, including multi-out
    const {transactions} = await api.account.getAccountTransactions(accountId,
      0,
      100, // the 100 most recent
      undefined, // must be undefined, iff not used
      undefined, // must be undefined, iff not used
      undefined, // must be undefined, iff not used
      true // this includes multi-out payments (since BRS v2.3)
    );

    // now we map the fields we want to print as a table to console then
    const mappedTransactions = transactions.map(t => ({
      recipient: t.recipientRS || 'Multiple Recipients', // we assume that undefined recipient field is multiout
      value: convertNQTStringToNumber(t.amountNQT), // convert from NQT aka Planck value to Burst
      fee: convertNQTStringToNumber(t.feeNQT)
    }));

    console.table(mappedTransactions, ['recipient', 'value', 'fee'])
  } catch (e) {
    // If the API returns an exception,
    // the return error object is of type HttpError
    console.error('Oh oh, something went wrong:',
      e.message,
      e.requestUrl
    )
  }
}

// Our entry point has to be async, as our subsequent calls are.
// This pattern keeps your app running until all async calls are executed
(async () => {
  const {account} = await ask();
  await listTransactions(account);
})();
