<img src="./assets/powered-by-burstjs.320px.png" alt="burstjs" width="320" align="middle" />

# burstjs-examples

This is a collection of examples for [burstjs](https://github.com/burst-apps-team/phoenix/blob/develop/lib/README.md)

Please, consider the [Online Documentation](https://burst-apps-team.github.io/phoenix/) also

> This is a living repo that will be updated from time to time to add more examples

# Installation

> You need git and nodejs (v10+) installed on your machine

First, you need to clone the remote repository to your machine, doing

```
git clone https://github.com/ohager/burstjs-examples.git`
```

There are different scenarios of how to use burstjs available. 
Each is organized in different folders

- [cli](./cli/README.MD) - BurstJS for command line interface using NodeJS
- [web](./web/README.MD) - Several Web technologies using BurstJS 
    - vanilla - The most painful way to build a web app (uses minified burstjs) 
    - svelte - The most hipster way to build e web app (uses npm packages) 

#### [Contracts Inspector](./web/vanilla/contracts-inspector)

> Level: Advanced
> This is a larger code base of a useful tool, which requires solid understanding of Browsers WebAPI, especially DOM 

This example application lists all Smart Contracts of an account, and allows detailed inspection

[Go to live site](https://contracts-inspector.ohager.vercel.app/)

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
