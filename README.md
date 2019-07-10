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
- web - Several Web technologies using BurstJS 
    - vanilla - The most painful way to build a web app (uses minified burstjs) 

## Command Line Interface (NodeJS) examples

These are examples using burstjs with NodeJS.

### Install

Simply run, 
1. `cd cli` (if not already in `./cli`)
2. `npm i` (installs all dependencies to run the examples)
3. `node ./<filename>`

Where `filename` is one of 
- `list-transactions.js`
- `show-messages.js`

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
	
### [Show Messages](./cli/show-messages.js)

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

> The not so recommended way of building a web app nowadays.

#### [Contracts Inspector](./web/vanilla/contracts-inspector)

> Level: Advanced
> Requires solid understanding of Browsers WebAPI, especially DOM 

This example application lists all Smart Contracts of an account, and allows detailed inspection

Run the `index.html` in any static file server.

Using [serve](https://www.npmjs.com/package/serve) may be the easiest way:

1. `npm i -g serve`
2. `cd ./web/vanilla/contracts-inspector`
3. `serve`
4. Open browser at given url, i.e. `http://localhost:5000`

##### Used methods/classes:
	- core/apiCompose
	- core/api.account.getContractsByAccount
	- core/ContractHelper
	- util/convertAddressToNumericId
	- crypto/hashSHA256
