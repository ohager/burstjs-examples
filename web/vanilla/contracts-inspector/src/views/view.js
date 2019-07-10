// I splitted the views in classes, that way I feel that I have more control of the Vanilla Mess
// At least it remembers me slightly of component driven development - it's far from being satisfactory :/
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
