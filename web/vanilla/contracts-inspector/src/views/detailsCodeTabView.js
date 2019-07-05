class DetailsCodeTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  renderView() {
    return `
<div class="contract-code">
${this._contract.machineCode}
</div>
<small>Length ${this._contract.machineCode.length/2} bytes</small>
`
  }
}
