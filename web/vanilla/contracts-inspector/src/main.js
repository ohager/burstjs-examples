
// We compose the api only once and provide it as global object
window.BurstApi = b$.composeApi({
  "nodeHost": "http://testnet.burstcoin.network:6876",
  "apiRootUrl": "burst"
});

function setAddress(e){
  let address = e.target.value;
  if(b$util.isBurstAddress(address)){
    address = b$util.convertAddressToNumericId(address);
  }
  fetchContracts(address)
}

function fetchContracts(accountId){
  const contractsTable = document.getElementById('contracts-table-body');
  const contracts = new ContractsView(contractsTable, accountId);
  contracts.mount()
}

function main(){
  window.modal = new Modal();
  const addressInput = document.getElementById('address-field')
  addressInput.addEventListener('blur', setAddress)

}
