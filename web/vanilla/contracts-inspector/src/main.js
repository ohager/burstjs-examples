
// We use a fixed account Id (used by JJOS for his Smart Contract tests on testnet
const ACCOUNT_ID = '5219831338759933722';

// We compose the api only once and provide it as global object
window.BurstApi = b$.composeApi({
  "nodeHost": "http://testnet.getburst.net:6876",
  "apiRootUrl": "burst"
});

function initializePage() {
  // Using the burstjs/util here
  const account = b$util.convertNumericIdToAddress(ACCOUNT_ID);
  document.getElementById('address-field').setAttribute('placeholder', account);
  window.modal = new Modal();
}

function main(){
  initializePage();
  const contractsTable = document.getElementById('contracts-table-body');
  const contracts = new ContractsView(contractsTable, ACCOUNT_ID);
  contracts.mount()
}
