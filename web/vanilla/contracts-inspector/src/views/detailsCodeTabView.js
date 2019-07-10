class DetailsCodeTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  renderView() {
    const divElement = document.createElement('div');
    // hashing the code can be interesting to check uniqueness
    const codeHash = b$crypto.hashSHA256(this._contract.machineCode);
    divElement.innerHTML= `
<div class="contract-code">
${this._contract.machineCode}
</div>
<small>Length ${this._contract.machineCode.length / 2} bytes - SHA-256: ${codeHash}</small>
`;

    return divElement;
  }
}
