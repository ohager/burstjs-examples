class DetailsCodeTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  renderView() {
    const divElement = document.createElement('div');
    divElement.innerHTML= `
<div class="contract-code">
${this._contract.machineCode}
</div>
<small>Length ${this._contract.machineCode.length / 2} bytes - SHA-256: ${b$crypto.hashSHA256(this._contract.machineCode)}</small>
`;

    return divElement;
  }
}
