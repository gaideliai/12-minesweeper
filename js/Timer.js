class Timer {
    constructor(parentHeader, parent){
        this.PARENT = parent;
        this.parentHeader = parentHeader;
        this.DOM = null;

        this.render();
    }

    render () {
        const HTML = `<div class="counter timer">000</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
    }
}
export default Timer;