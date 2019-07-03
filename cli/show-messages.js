const {isAttachmentVersion, TransactionType, TransactionArbitrarySubtype} = require('@burstjs/core');
const {convertBurstTimeToDate} = require('@burstjs/util');
const {api, askAccount, handleApiError, getAccountId} = require('./helper');

const getMessageText = transaction =>
	isAttachmentVersion(transaction,'EncryptedMessage')
		? '<encrypted>'
		: transaction.attachment.message;

async function showMessages(account) {
	try {
		const accountId = getAccountId(account);
		const {transactions} = await api.account.getAccountTransactions(accountId,
			undefined,
			undefined,
			undefined,
			TransactionType.Arbitrary,
			TransactionArbitrarySubtype.Message
			);
		
		// now we map the fields we want to print as a table to console then
		const mappedTransactions = transactions.map(t => ({
			recipient: t.recipientRS,
			message: getMessageText(t),
			date: convertBurstTimeToDate(t.blockTimestamp)
		}));
		
		console.table(mappedTransactions, ['recipient', 'message', 'date'])
	} catch (e) {
		handleApiError(e)
	}
}


(async () => {
	const {account} = await askAccount();
	await showMessages(account);
})();
