const ACCOUNT_ID = '5219831338759933722';

window.BurstApi = b$.composeApi({
  "nodeHost": "http://testnet.getburst.net:6876",
  "apiRootUrl": "burst"
});

function initializePage() {
  const account = b$util.convertNumericIdToAddress(ACCOUNT_ID);
  document.getElementById('address-field').setAttribute('placeholder', account)
  window.modal = new Modal();
}

function main(){
  initializePage();
  const contractsTable = document.getElementById('contracts-table-body');
  const contracts = new ContractsView(contractsTable, ACCOUNT_ID);
  contracts.mount()
}
