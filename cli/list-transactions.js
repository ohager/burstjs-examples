// const {isBurstAddress, convertAddressToNumericId, BurstValue} = require("@burstjs/util");
const {Address} = require("@signumjs/core");
const {Amount} = require("@signumjs/util");

const {api, askAccount, handleApiError} = require('./helper');

async function listTransactions(account) {

    // we check if incoming account is either a BURST Address, or Numeric Id
    // eventually, we convert to Numeric Id
    const accountId = Address.create(account).getNumericId()

    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {

        // Now, we call the getAccountTransactions method,
        // but we want only the 100 most recent transactions, including multi-out
        const {transactions} = await api.account.getAccountTransactions(
            {
                firstIndex: 0,
                lastIndex: 100,
                includeIndirect: true,
                accountId,
            }
        );

        // now we map the fields we want to print as a table to console then
        const mappedTransactions = transactions.map(t => ({
            recipient: t.recipientRS || 'Multiple Recipients', // we assume that undefined recipient field is multiout
            value: Amount.fromPlanck(t.amountNQT).toString(), // convert from NQT aka Planck value to Burst
            fee: Amount.fromPlanck(t.feeNQT).toString()
        }));

        console.table(mappedTransactions, ['recipient', 'value', 'fee'])
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleApiError(e);
    }
}

// // Our entry point has to be async, as our subsequent calls are.
// // This pattern keeps your app running until all async calls are executed
(async () => {
    const {account} = await askAccount();
    await listTransactions(account);
})();
