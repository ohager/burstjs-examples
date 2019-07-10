// I splitted the views in classes, that way I feel that I have more control of the Vanilla Mess
// At least it remembers me slightly of component driven development
class ContractsView extends View {

  constructor(parent, accountId) {
    super(parent);
    this._contractId = accountId;
  }

  async mount() {
    // here we access the globally stored API to get all contracts of a given account
    const {ats: contracts} = await BurstApi.contract.getContractsByAccount(this._contractId);
    this.render(contracts);
  };

  // Override from View!
  renderView(contracts) {
    let rows = [];
    for (let i = 0; i < contracts.length - 4; ++i) {
      rows.push(this._createContractRow(contracts[i]));
    }
    return rows;
  }

  _createContractRow(contract) {
    const {name, description, at} = contract;
    const rowNode = document.createElement('tr');
    rowNode.addEventListener('click', this._onViewDetails.bind(this, contract, rowNode));
    rowNode.setAttribute('class', 'c-table__row');
    rowNode.innerHTML = `
    <td class="c-table__cell">${at}</td>
    <td class="c-table__cell">${name}</td>
    <td class="c-table__cell">${description}</td>
    <td class="c-table__cell">${this._createStatusHTML(contract)}</td>
    `;
    return rowNode;
  }

  _createStatusHTML({finished, stopped, frozen, dead}) {

    const badges = [];

    if (finished) {
      badges.push(`<span class="c-badge c-badge--rounded">Finished</span>`)
    }
    if (stopped) {
      badges.push(`<span class="c-badge c-badge--rounded c-badge--warning">Stopped</span>`)
    }
    if (dead) {
      badges.push(`<span class="c-badge c-badge--rounded c-badge--dead">Dead</span>`)
    }
    if (frozen) {
      badges.push(`<span class="c-badge c-badge--rounded c-badge--info">Frozen</span>`)
    }

    if (!finished && badges.length === 0) {
      badges.push(`<span class="c-badge c-badge--rounded c-badge--success">Running</span>`)
    }

    return `<div class="contract-status">${badges.join(' ')}</div>`

  }

  _onViewDetails(contract, parentNode){
    const details = new DetailsView(parentNode, contract);
    details.mount();
  }

}


