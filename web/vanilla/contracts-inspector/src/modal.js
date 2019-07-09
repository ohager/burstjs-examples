const VISIBLE_CLASS_OVERLAY = 'c-overlay--visible';
const VISIBLE_CLASS_DIALOG = 'o-modal--visible';

class Modal {

  constructor(){
    this._overlayNode = document.querySelector('#modal>.c-overlay');
    this._dialogNode = document.querySelector('#modal>.o-modal');
  }

  close() {
    this._overlayNode.classList.remove(VISIBLE_CLASS_OVERLAY);
    this._dialogNode.classList.remove(VISIBLE_CLASS_DIALOG);
    const cardBody = this._dialogNode.querySelector('.c-card__body');
    cardBody.removeChild(cardBody.firstElementChild);
    window.dispatchEvent(new Event('modal:close'))
  }

  open(title, content){
    this._overlayNode.classList.add(VISIBLE_CLASS_OVERLAY);
    this._dialogNode.classList.add(VISIBLE_CLASS_DIALOG);
    this._dialogNode.querySelector('.c-heading').innerHTML = title;
    this._dialogNode.querySelector('.c-card__body').appendChild(content);
    window.dispatchEvent(new Event('modal:open'))
  }
}
