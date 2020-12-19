const {api, ensureAccountId, askAccount} = require("./helper");

// this is not recommended, but it may happen that the SSL cert of a peer is not
// completely valid
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

/**
 * This is the recursive function that calls itself as long an account has at least 500 transactions
 * @param accountId
 * @param firstIndex (optional) the start index where to start, it always referes to the most recent tx
 * @param lastIndex (optional) the last index (BRS returns at maximum 500 tx per call)
 * @param allTransactions (optional,) this is our collector array, where we gather the chunked tx
 * @returns {Promise<*[]>} If all transactions were fetched it returns an array with _all_ tx
 * @note This method can run a long time, if an account has an extreme amount of transactions
 */
async function getTransactions({
                                   accountId,
                                   firstIndex = 0, //
                                   lastIndex = 499,
                                   allTransactions = []
                               }) {
    console.info(`Fetching transactions from index ${firstIndex} to ${lastIndex}...`)
    const {transactions} = await api.account.getAccountTransactions({
        accountId, // syntax sugar for: accountId: accountId
        firstIndex, // idem
        lastIndex, // idem
        includeIndirect: true,
    })
    console.info(`Got ${transactions.length} transactions`)
    // append the current chunk of transactions to the array
    allTransactions.push(...transactions)

    // if the chunk is full (500 tx) then we fetch the next chunk
    if (transactions.length >= 500) {
        // recursive call
        await getTransactions({
            accountId,
            lastIndex: lastIndex + 500,
            firstIndex: firstIndex + 500,
            allTransactions
        })
    }

    return allTransactions
}


// Our entry point has to be async, as our subsequent calls are.
// This pattern keeps your app running until all async calls are executed
(async () => {
    try {
        let inputAccount = process.argv[2]
        if (!inputAccount) {
            const {account} = await askAccount();
            inputAccount = account
        }
        const accountId = ensureAccountId(inputAccount);
        const tx = await getTransactions({accountId});
        console.info(`Fetched a total of ${tx.length} transactions`)
    } catch (e) {
        console.error(e)
    }
})();
