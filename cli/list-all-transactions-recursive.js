const {api, ensureAccountId, askAccount} = require("./helper");

// this is not recommended, but it may happen that the SSL cert of a peer is not
// completely valid
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

/**
 * das ist die rekursive Funktion, die nach und nach alle tx in einem Array sammelt
 * sie ist asynchron, also nebenlaeufig, und erwartet ein JSON objekt der folgenden Struktur
 * @param accountId Die AccountId
 * @param firstIndex (optional, mit anfangswert 0) der erste index
 * @param lastIndex (optional, mit anfangswert 499) der letzte index
 * @param allTransactions (optional, mit einem leeren Array als Anfangswert) das Array brauchen wor als "Sammler" fuer die tx
 * @returns {Promise<*[]>} Die Funktion gibt ein Promise mit einem Array zurueck. Das Array wird _alle_ transaktionen beinhalten
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
    allTransactions.push(...transactions)

    if (transactions.length >= 500) {
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
