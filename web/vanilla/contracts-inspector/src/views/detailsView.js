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

    // const helper = new b$.ContractHelper(this._contract);

    const attributesTabView = new DetailsAttributesTabView(null, this._contract);
    const codeTabView = new DetailsCodeTabView(null, this._contract);
    const dataTabView = new DetailsDataTabView(null, this._contract);
    return `
<div id="detail-tabs" role="tablist" class="c-tabs">
  <div class="c-tabs__nav">
    <div id="detail-headings" class="c-tabs__headings">
      <button role="tab" class="c-tab-heading c-tab-heading--active">Attributes</button>
      <button role="tab" class="c-tab-heading">Data</button>
      <button role="tab" class="c-tab-heading">Code</button>
    </div>
  </div>
  <div role="tabpanel" class="c-tabs__tab">${attributesTabView.renderView()}</div>
  <div role="tabpanel" hidden class="c-tabs__tab">${dataTabView.renderView()}</div>
  <div role="tabpanel" hidden class="c-tabs__tab">${codeTabView.renderView()}</div>
</div>
`
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

  _onModalClose() {
    const headings = document.getElementById('detail-headings');
    const tabs = headings.getElementsByClassName('c-tab-heading');
    forEachOfElement(tabs, (tab, index) => {
      tab.removeEventListener('click', this._showTabHandler[index])
    })
  }

  mount() {
    window.addEventListener('modal:open', this._onModalOpen.bind(this));
    window.addEventListener('modal:close', this._onModalClose.bind(this));
    window.modal.open(this._contract.name, this.renderView());
  };
}
