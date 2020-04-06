class BombCounter {
    constructor(parentHeader, bombCount) {
        this.parentHeader = parentHeader;
        this.bombCount = bombCount;

        this.render ();
    }

    render () {
        const HTML = `<div class="counter bombs">${this.convert(this.bombCount)}</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
    }

    convert( number ) {
        let newNumber = number;
        if (number<100){
            newNumber = '0'+newNumber;
        }
        if (number<10){
            newNumber = '0'+newNumber;
        }
        return newNumber;
    }
}

export default BombCounter;