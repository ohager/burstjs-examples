const TestNetUrl = "https://testnet-2.burst-alliance.org:6876"
const MainNetUrl = "https://wallet.burst-alliance.org:8125"


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
}

async function fetchContracts(accountId) {
  const contractsTable = document.getElementById('contracts-table-body');
  const contracts = new ContractsView(contractsTable, accountId);
  try {
    await contracts.mount()
  } catch (e) {
    const errorView = new ErrorMessageView(null, e.message);
    window.modal.open("Oh no!", errorView.renderView())
  }
}

async function onUpdateContractsClick(e) {
  const element = e.target;
  if (element.classList.contains('busy')) {
    return;
  }
  element.classList.add('busy');
  const currentAccountId = getCurrentAccountId();
  await fetchContracts(currentAccountId);
  element.classList.remove('busy');
}

function parseArguments() {
  const query = window.location.search
  if (!query.length) return {}

  const arguments = query.substr(1).split('&')
  return arguments.reduce((obj, arg) => {
    const strings = arg.split('=');
    obj[strings[0]] = strings[1] || true
    return obj
  }, {})
}

function applyQueryArguments() {
  const args = parseArguments()

  const networkSelector = document.getElementById('network-selector');
  networkSelector.value = args.testnet ? TestNetUrl : MainNetUrl
  networkSelector.dispatchEvent(new Event('change'));

  if (args.address) {
    const addressField = document.getElementById('address-field')
    addressField.value = args.address;
    document.getElementById('address-button').click()
  }

}

function main() {

  const addressInput = document.getElementById('address-button');
  addressInput.addEventListener('click', e => {
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

  applyQueryArguments()
}
