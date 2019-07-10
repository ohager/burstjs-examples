// nothing burstjs specific here... just mounts the table with the contracts
class DetailsAttributesTabView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;
  }

  _getAttTableRowHtml(key, value) {
    return `
    <tr class="c-table__row">
      <td class="c-table__cell">${key}</td>
      <td class="c-table__cell">${value}</td>
    </tr>
    `
  }

  _getTableContentHtml() {
    const ignoredAtts = ['creator', 'creatorRS', 'machineCode', 'machineData'];

    const attsHtml =
      Object.keys(this._contract)
        .filter(a => !ignoredAtts.includes(a))
        .map(a => this._getAttTableRowHtml(a, this._contract[a])).join(' ');

    return `
<caption class="c-table__caption">Contract Attributes</caption>
<thead class="c-table__head">
  <tr class="c-table__row c-table__row--heading">
  <th class="c-table__cell">Attribute</th>
  <th class="c-table__cell">Value</th>
  </tr>
</thead>
<tbody class="c-table__body">
${attsHtml}
</tbody>`
  }

  renderView() {
    const tableElement = document.createElement('table');
    tableElement.classList.add('c-table');
    tableElement.innerHTML = this._getTableContentHtml();
    return tableElement;
  }

}
