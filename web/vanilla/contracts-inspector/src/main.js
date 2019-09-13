function getCurrentAccountId() {
  let accountId = document.getElementById('address-field').value.trim();
  if (b$util.isBurstAddress(accountId)) {
    accountId = b$util.convertAddressToNumericId(accountId);
  }
  return accountId;
}

function updateNetwork(newNodeHost) {
  if (window.ApiSettings.nodeHost !== newNodeHost) {
    window.ApiSettings.nodeHost = newNodeHost;
    window.BurstApi = b$.composeApi(window.ApiSettings);
  }
  const currentAddress = getCurrentAccountId();
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

async function onUpdateContractsClick(e){
  const element = e.target;
  if(element.classList.contains('busy')){
    return;
  }
  element.classList.add('busy');
  const currentAccountId = getCurrentAccountId();
  await fetchContracts(currentAccountId);
  element.classList.remove('busy');
}

function main() {

  const addressInput = document.getElementById('address-field');
  addressInput.addEventListener('blur', e => {
    fetchContracts(getCurrentAccountId(e.target.value))
  });

  const networkSelector = document.getElementById('network-selector');
  networkSelector.addEventListener('change', e => {
    updateNetwork(e.target.value)
  });

  const updateAction = document.getElementById('update-action');
  updateAction.addEventListener('click', onUpdateContractsClick);

  window.ApiSettings = new b$.ApiSettings(networkSelector.value, "burst");
  window.BurstApi = b$.composeApi(window.ApiSettings);
  window.modal = new Modal();

}
