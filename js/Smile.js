class Smile {
    constructor(parentHeader, parent){
        this.PARENT = parent;
        this.parentHeader = parentHeader;
        this.DOM = null;

        this.render();
    }

    render () {
        const HTML = `<div class="smile">:)</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
        this.DOM = this.parentHeader.querySelector('.smile');
        this.DOM.addEventListener('click', () => this.PARENT.resetGame());

    }

    sad() {
        this.DOM.innerText = ':(';
    }

    happy() {
        this.DOM.innerText = ':)';
    }
}

export default Smile;