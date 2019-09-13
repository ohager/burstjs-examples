function updateAddress(address) {
  if (b$util.isBurstAddress(address)) {
    address = b$util.convertAddressToNumericId(address);
  }
  fetchContracts(address)
}

function getCurrentAddress() {
  return document.getElementById('address-field').value.trim()
}

function updateNetwork(newNodeHost) {
  if (window.ApiSettings.nodeHost !== newNodeHost) {
    window.ApiSettings.nodeHost = newNodeHost;
    window.BurstApi = b$.composeApi(window.ApiSettings);
  }
  const currentAddress = getCurrentAddress();
  if(currentAddress && currentAddress.length){
    updateAddress(currentAddress)
  }
}

async function fetchContracts(accountId) {
  const contractsTable = document.getElementById('contracts-table-body');
  const contracts = new ContractsView(contractsTable, accountId);
  try{
    await contracts.mount()
  }catch(e){
    const errorView = new ErrorMessageView(null, e.message);
    window.modal.open("Oh no!", errorView.renderView())
  }
}

function main() {

  const addressInput = document.getElementById('address-field');
  addressInput.addEventListener('blur', e => {
    updateAddress(e.target.value)
  });

  const networkSelector = document.getElementById('network-selector');
  networkSelector.addEventListener('change', e => {
    updateNetwork(e.target.value)
  });
  window.ApiSettings = new b$.ApiSettings(networkSelector.value, "burst");
  window.BurstApi = b$.composeApi(window.ApiSettings);
  window.modal = new Modal();

}
