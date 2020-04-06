class Cell {
    constructor( index, x, y, parent) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.PARENT = parent;
        this.parentDOM = parent.DOMfield;
        this.DOM = null;
        this.hasBomb = false;
       
        this.init();
    }

    init() {
        const HTML = `<div id="c_${this.index}" class="cell"></div>`;
        this.parentDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.parentDOM.querySelector(`#c_${this.index}`);

        this.DOM.addEventListener( 'click', (e) => this.click(e), {once: true} );
    }

    click(event) {
        if (this.PARENT.canPlay){
        this.DOM.classList.add('open');
            if (this.hasBomb) {
                this.DOM.classList.add('bomb');
            }
        this.PARENT.checkCell(this.index);
        }
    }
    
    addBomb () {
        this.hasBomb = true;
        this.DOM.innerText = 'B';
    }

    showNumber (number) {
        this.DOM.innerText = number;
    }
}

export default Cell;