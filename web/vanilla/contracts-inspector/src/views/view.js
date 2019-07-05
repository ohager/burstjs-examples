class View {

  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  renderView(props) {
    throw new Error('Override me!')
  }

  render(props) {
    const view = this.renderView(props);
    if (Array.isArray(view)) {
      view.forEach(el => {this.parentElement.append(el)})
    } else {
      this.parentElement.append(view)
    }
  }
}
