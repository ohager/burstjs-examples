
// this small function ignores eventual conversion exceptions,
// which would stop code execution otherwise
function getVariable(position, getterFn) {
  try {
    return getterFn(position);
  } catch (_) {
    return null
  }
}


class DetailsDataTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  _tokenizeMachinedata() {
    const VariableLength = b$.ContractHelper.VARIABLE_LENGTH;
    // The contract helper is your friend, if you want access variables the easy way
    // The data in the contract is stored in 8 byte blocks (expressed by Hex Values) and in little endian order
    // The helper not only converts to big endian order, but also converts into decimal, or tries to convert into string format
    const helper = new b$.ContractHelper(this._contract);
    const {machineData} = this._contract;
    const machineDataTokens = [];

    for (let i = 0; i < machineData.length; i += VariableLength) {
      const position = Math.floor((i / VariableLength));
      const token = machineData.substr(i, VariableLength);

      machineDataTokens.push({
        token,
        hex: getVariable(position, p => helper.getVariable(p)),
        decimal: getVariable(position, p => helper.getVariableAsDecimal(p)),
        string: getVariable(position, p => helper.getVariableAsString(p))
      })
    }

    return machineDataTokens;
  }

  onHover(e) {
    const tokenElement = e.target;
    const valuesElement = document.getElementsByClassName('contract-data__values');
    valuesElement[0].querySelector('input[name="hex"]').value = tokenElement.attributes['data-hex'].value;
    valuesElement[0].querySelector('input[name="decimal"]').value = tokenElement.attributes['data-decimal'].value;
    valuesElement[0].querySelector('input[name="string"]').value = tokenElement.attributes['data-string'].value;
  }

  _getStaticHtmlWrapper() {
    return`<div class="contract-data__raw">
    <div></div>
    <small>Length ${this._contract.machineData.length / 2} bytes</small>
  </div>
  <div class="contract-data__values">
    <fieldset class="o-fieldset">
      <div class="o-form-element">
        <label class="c-label" for="hex">Hex Value</label>
        <input name="hex" placeholder="Select a token" class="c-field" readonly>
      </div>
      <div class="o-form-element">
        <label class="c-label" for="decimal">Decimal Value</label>
        <input name="decimal" placeholder="Select a token" class="c-field" readonly>
      </div>
      <div class="o-form-element">
        <label class="c-label" for="string">String Value</label>
        <input name="string" placeholder="Select a token" class="c-field" readonly>
      </div>
    </fieldset>
  </div>
</div>`;
  }

  _renderCodeVariables(parentElement) {
    const tokens = this._tokenizeMachinedata();
    const onHoverFunction = this.onHover.bind(this);
    for (let i = 0; i < tokens.length; ++i) {
      const {token, hex, decimal, string} = tokens[i];
      const spanElement = document.createElement('span');
      spanElement.classList.add('token');
      spanElement.setAttribute('data-index', `${i}`);
      spanElement.setAttribute('data-hex', `${hex}`);
      spanElement.setAttribute('data-decimal', `${decimal}`);
      spanElement.setAttribute('data-string', `${string}`);
      spanElement.innerText = token;
      spanElement.onmouseover = onHoverFunction;
      parentElement.appendChild(spanElement);
    }
  }

  renderView() {

    const wrapperElement = document.createElement('div');
    wrapperElement.classList.add('contract-data__wrapper');
    wrapperElement.innerHTML = this._getStaticHtmlWrapper();
    const constractDataRawElement = wrapperElement.getElementsByClassName('contract-data__raw');
    this._renderCodeVariables(constractDataRawElement[0].firstElementChild);

    return wrapperElement;

  }
}
