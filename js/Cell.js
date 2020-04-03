class Cell {
    constructor( index, parentDOM ) {
        this.index = index;
        this.parentDOM = parentDOM;
        this.DOM = null;

        this.init();
    }

    init() {
        const HTML = `<div id="c_${this.index}" class="cell">${this.index}</div>`;
        this.parentDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.parentDOM.querySelector(`#c_${this.index}`);

        this.DOM.addEventListener( 'click', (e) => this.click(e) );
    }

    click( event ) {
        console.log('Paspausta celle: '+this.index);
    }
}

export default Cell;