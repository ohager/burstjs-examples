<img src="./assets/powered-by-burstjs.320px.png" alt="burstjs" width="320" align="middle" />

# burstjs-examples

This is a collection of examples for [burstjs](https://github.com/burst-apps-team/phoenix/blob/develop/lib/README.md)

Please, consider the [Online Documentation](https://burst-apps-team.github.io/phoenix/) also

# Installation

> You need git and nodejs (v10+) installed on your machine

First, you need to clone the remote repository to your machine, doing

```
git clone https://github.com/ohager/burstjs-examples.git`
```

There are different scenarios of how to use burstjs available. 
Each is organized in different folders

- cli - BurstJS for command line interface using NodeJS
- ...TO DO 

## Command Line Interface (NodeJS) examples

These are examples using burstjs with NodeJS.

### Install

Simply run, 
1. `cd cli` (if not already in `./cli`)
2. `npm i` (installs all dependencies to run the examples)

The following examples are available

### [List Account Transactions](./cli/list-transactions.js)

> Level: Basic

List the recent transactions of given account and prints in table form to console

#### Used methods:
	- core/apiCompose
	- core/api.account.getAccountTransactions
	- util/convertNQTStringToNumber
	- util/isBurstAddress
	- util/convertAddressToNumericId
	
### [Show Messages](./cli/list-transactions.js)

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
	
	
## Web

Examples of Web applications, i.e. apps which run in the browser

### Vanilla 

Examples of pure HTML, CSS and Javascript (using minified burstjs bundle)

#### [Contracts Inspector](./web/vanilla/contracts-inspector)

> Level: Advanced

This example lists all Smart Contracts of an account, and allows detailed inspection

##### Used methods/classes:
	- core/apiCompose
	- core/api.account.getContractsByAccount
	- core/ContractHelper
	- util/convertAddressToNumericId
