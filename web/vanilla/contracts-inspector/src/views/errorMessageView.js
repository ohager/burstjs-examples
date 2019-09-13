class ErrorMessageView extends View {

  constructor(parent, message) {
    super(parent);
    this._message = message;
  }

  renderView() {
    const divElement = document.createElement('div');
    divElement.innerHTML= `
<div class="error-message">
${this._message}
</div>
`;

    return divElement;
  }
}
