function getRecipientAccountId() {
  let accountId = document.getElementById('address-field').value.trim();
  if (b$util.isBurstAddress(accountId)) {
    accountId = b$util.convertAddressToNumericId(accountId);
  }
  return accountId;
}

function getPassphrase() {
  return document.getElementById('passphrase-field').value.trim();
}

function getMessage() {
  return document.getElementById('message-field').value.trim();
}

function hideMessage() {
  document.getElementById('success-message').setAttribute('hidden', '');
}

function hideError() {
  document.getElementById('error-message').setAttribute('hidden', '');
}

function showError(message){
  const errorMessage =document.getElementById('error-message')
  errorMessage.textContent = message;
  errorMessage.removeAttribute('hidden');
}

function showSuccess(message){
  const successMessage =document.getElementById('success-message')
  successMessage.textContent = message;
  successMessage.removeAttribute('hidden');
}


function validateForm() {

  hideError()
  hideMessage()

  const recipientId = getRecipientAccountId()
  const passphrase = getPassphrase()
  const message = getMessage()

  const ne = s => s && s.length > 0

  const isValid = ne(recipientId) && ne(passphrase) && ne(message)
  if (isValid) {
    document
      .getElementById('send-button')
      .removeAttribute('disabled')
  } else {
    document
      .getElementById('send-button')
      .setAttribute('disabled', 'disabled')
  }
}


async function sendMessage() {
  const recipientId = getRecipientAccountId()
  const passphrase = getPassphrase()
  const message = getMessage()

  const keys = b$crypto.generateMasterKeys(passphrase)

  const params = {
    feePlanck: b$util.BurstValue.fromBurst(0.025).getPlanck(),
    recipientId,
    message,
    messageIsText: true,
    senderPrivateKey: keys.signPrivateKey,
    senderPublicKey: keys.publicKey
  }
  try {
    await window.BurstApi.message.sendMessage(params)
    showSuccess('Message sent successfully')
  } catch (e) {
    showError(e.message)
  }
}

function updateNetwork(newNodeHost) {
  if (window.ApiSettings.nodeHost !== newNodeHost) {
    window.ApiSettings.nodeHost = newNodeHost;
    window.BurstApi = b$.composeApi(window.ApiSettings);
  }
}

function listenAndValidate(id) {
  document.getElementById(id).addEventListener('keyup', validateForm)
}

function main() {

  const networkSelector = document.getElementById('network-selector');
  networkSelector.addEventListener('change', e => {
    updateNetwork(e.target.value)
  });

  listenAndValidate('passphrase-field')
  listenAndValidate('address-field')
  listenAndValidate('message-field')

  window.ApiSettings = new b$.ApiSettings(networkSelector.value, ApiVersion.V1, {});
  window.BurstApi = b$.composeApi(window.ApiSettings);

}
