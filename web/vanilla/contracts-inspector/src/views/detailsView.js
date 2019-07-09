function forEachOfElement(htmlCollection, callback) {
  for (let i = 0; i < htmlCollection.length; ++i) {
    const item = htmlCollection.item(i);
    callback(item, i);
  }
}

class DetailsView extends View {

  constructor(parent, contract) {
    super(parent);
    this._contract = contract;

    this._showTabHandler = [
      this._showTab.bind(this, 0),
      this._showTab.bind(this, 1),
      this._showTab.bind(this, 2),
    ]
  }

  renderView() {

    const divElement = document.createElement('div');
    divElement.setAttribute('role', 'tablist');
    divElement.setAttribute('id', 'detail-tabs');
    divElement.classList.add('c-tabs');
    divElement.innerHTML = `<div class="c-tabs__nav">
    <div id="detail-headings" class="c-tabs__headings">
      <button role="tab" class="c-tab-heading c-tab-heading--active">Attributes</button>
      <button role="tab" class="c-tab-heading">Data</button>
      <button role="tab" class="c-tab-heading">Code</button>
    </div>
  </div>
`;
    divElement.appendChild(this._getTabPanel(DetailsAttributesTabView, true));
    divElement.appendChild(this._getTabPanel(DetailsDataTabView));
    divElement.appendChild(this._getTabPanel(DetailsCodeTabView));

    return divElement
  }

  _getTabPanel(tabViewClass, isActive = false) {
    const divElement = document.createElement('div');
    divElement.setAttribute('role', 'tabpanel');
    if(!isActive){
      divElement.setAttribute('hidden', true);
    }
    divElement.classList.add('c-tabs__tab');
    const tabView = new tabViewClass(divElement, this._contract);
    divElement.appendChild(tabView.renderView());
    return divElement;
  }

  _showTab(index) {
    const ACTIVE_CLASS = 'c-tab-heading--active';
    const headings = document.getElementById('detail-headings');
    const tabs = headings.children;
    forEachOfElement(tabs, t => {
      t.classList.remove(ACTIVE_CLASS);
    });
    tabs[index].classList.add(ACTIVE_CLASS);

    const panelParent = document.getElementById('detail-tabs');
    const panels = panelParent.getElementsByClassName('c-tabs__tab');
    forEachOfElement(panels, p => {
      p.setAttribute('hidden', true);
    });
    panels[index].removeAttribute('hidden');
  }

  _onModalOpen() {
    const headings = document.getElementById('detail-headings');
    const tabs = headings.children;
    forEachOfElement(tabs, (tab, index) => {
      tab.addEventListener('click', this._showTabHandler[index]);
    })
  }


  mount() {
    window.addEventListener('modal:open', this._onModalOpen.bind(this));
    window.modal.open(this._contract.name, this.renderView());
  };

}
