class DetailsDataTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  renderView() {

    // TODO:
    return `
<div class="contract-code">
${this._contract.machineData}
</div>
<small>Length ${this._contract.machineData.length/2} bytes</small>
`
  }
}
