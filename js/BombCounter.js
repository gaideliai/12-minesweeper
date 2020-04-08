class BombCounter {
    constructor(parentHeader, bombCount) {
        this.parentHeader = parentHeader;
        this.bombCount = bombCount;
        this.DOM = null;

        this.render ();
    }

    render () {
        const HTML = `<div class="counter bombs">${this.convert(this.bombCount)}</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
        this.DOM = this.parentHeader.querySelector('.counter.bombs');
    }

    update (value) {
        if (value === -1 || value === 1) {
            this.bombCount += value;
            this.DOM.innerText = this.convert(this.bombCount);
        }
    }

    convert( number ) {
        let newNumber = number;
        const positive = number >= 0 ? true : false;

        newNumber = Math.abs(number);
        if (number<100){
            newNumber = '0'+newNumber;
        }
        if (number<10){
            newNumber = '0'+newNumber;
        }
        if ( !positive ) {
            newNumber = '-'+newNumber;
        }
        return newNumber;
    }
    // convert( number ) {
    //     const maxLength = 3;
    //     const numberLength = (''+number).length;
    //     return '0'.repeat(maxLength-numberLength) + number;
    // }
}

export default BombCounter;