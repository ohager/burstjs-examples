
## Command Line Interface (NodeJS) examples

These are examples using burstjs with NodeJS.

### Install

Simply run, 
1. `cd cli` (if not already in `./cli`)
2. `npm i` (installs all dependencies to run the examples)
3. `node ./<filename>`

Where `filename` is one of 
- `create-subscription.js`
- `list-transactions.js`
- `send-burst.js`
- `show-messages.js`

The following examples are available

### [List Account Transactions](list-transactions.js)

> Level: Basic

List the recent transactions of given account and prints in table form to console

#### Used methods:
	- core/apiCompose
	- core/api.account.getAccountTransactions
	- util/convertNQTStringToNumber
	- util/isBurstAddress
	- util/convertAddressToNumericId
	
### [Show Messages](show-messages.js)

> Level: Basic

List only the messages of given account and prints in table form.
Encrypted messages won't be encrypted

#### Used methods:
	- core/apiCompose
	- core/api.account.getAccountTransactions
	- core/isAttachmentVersion
	- util/convertBurstTimeToDate
	- util/isBurstAddress
	- util/convertAddressToNumericId
	
