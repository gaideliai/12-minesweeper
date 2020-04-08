import Cell from './Cell.js';
import BombCounter from './BombCounter.js';
import Smile from './Smile.js';
import Timer from './Timer.js';

class Minesweeper {
    constructor (target, width, height, bombsPercentage) {
        this.target = target;
        this.DOM = null;
        this.DOMfield = null;        
        this.width = width;
        this.height = height;
        this.bombsPercentage = bombsPercentage;
        this.bombsCount = 1;

        this.canPlay = true;
        this.clickCount = 0;
        this.bombCounter = null;
        this.smile = null;
        this.timer = null;
        this.cells = [];

        this.init();
    }

    init() {
        this.validate();
        this.render();
    }

    resetGame () {        
        this.canPlay = true;
        this.clickCount = 0;        
        this.cells = [];
        this.render();       
    }

    validate () {
        // patikriname, ar target selektorius egzistuoja 
        const DOM = document.querySelector(this.target);       
        if(!DOM) {
            throw 'Kritinė klaida, reikia nurodyti tinkamą selektorių, kur generuoti žaidimą!';
        }
        this.DOM = DOM;

        // patikriname, ar plotis ir aukstis yra skaiciai, ar logisku reiksmiu
        if( typeof(this.width) !== 'number' || 
            this.width < 1 ||
            this.width % 1 > 0){
            throw 'Netinkamas plotis!';
        }
        if( typeof(this.height) !== 'number' || 
            this.height < 1 ||
            this.height % 1 > 0){
            throw 'Netinkamas aukstis!';
        }
        if (this.widht * this.height < 2 ){
            throw 'Bendras lentos plotas yra per mazas.'
        }
        if( typeof(this.bombsPercentage) !== 'number' || 
            this.bombsPercentage <= 0 ||
            this.bombsPercentage >= 100){
            throw 'Netinkamas bombu kiekis!';
        }
        // skaiciuojame bombu kieki
        const bombsCount = Math.floor(this.width * this.height * this.bombsPercentage / 100);
        if ( bombsCount > 0 ) {
            this.bombsCount = bombsCount;
        }
    }

    render() {
        let HTML = `<div class="header"></div>
                    <div class="field"></div>`;
        this.DOM.classList.add('minesweeper');
        this.DOM.innerHTML = HTML;

        this.DOM.style.width = (30 * this.width + 10) + 'px';

        this.DOMheader = this.DOM.querySelector('.header');
        this.DOMfield = this.DOM.querySelector('.field');

        this.DOMfield.style.width = (30 * this.width) + 'px';


        this.bombCounter = new BombCounter(this.DOMheader, this.bombsCount);
        this.smile = new Smile(this.DOMheader, this);
        this.timer = new Timer(this.DOMheader, this);

        for ( let i=0; i<this.width * this.height; i++ ) {
            const x = i % this.width;
            const y = (i - x)/ this.width;
            this.cells.push ( new Cell(i, x, y, this) );
        }
    }

    createBombs( cellIndex ) {        
        let list = [];
        
        while ( list.length < this.bombsCount ) {
            const position = Math.floor( Math.random() * this.width * this.height );

            if ( list.indexOf(position) === -1 && position !== cellIndex ) {
                list.push( position );
                this.cells[position].addBomb();
            }
        }        
    }

    checkCell( cellIndex ) {
        if( !this.canPlay) {
            return;
        }
        
        //pirmas paspaudimas - generuojamos bombos
        if ( this.clickCount === 0 ) {
            this.createBombs( cellIndex );
            this.timer.start();            
        }
        this.clickCount++;

        //atidaromas paspaustas langelis
        if ( this.cells[cellIndex].hasBomb ) {
            //game over
            this.gameOver();
        } else {
            //tikriname aplinkinius langelius ir skaiciuojame, kiek yra aplinkui bombu
            //atvaizduojame langelyje bombu skaiciu
            const surroundingBombs = this.calcSurroundingBombs(cellIndex);            
            this.cells[cellIndex].showNumber(surroundingBombs);

            const cx = this.cells[cellIndex].x;
            const cy = this.cells[cellIndex].y;            

            if (surroundingBombs === 0) {                
                //tesiame tikrinima aplinkiniuose langeliuose
                for ( let dx=-1; dx<=1; dx++ ) {
                    for ( let dy=-1; dy<=1; dy++ ) {
                        if ( cx+dx >= 0 && cx+dx < this.width &&
                             cy+dy >= 0 && cy+dy < this.height ) {
                            const surroundingCellIndex = cx+dx + (cy+dy) * this.width;
                            this.cells[surroundingCellIndex].click();
                        }
                    }
                }
            }
            //jei tai paskutine cele be bombos - WIN
            if (this.isWin()) {
                this.canPlay = false;
                this.smile.win();
                this.timer.stop();
            }            
        }
    }

    calcSurroundingBombs (cellIndex) {
        let count = 0;
        const currentCell = this.cells[cellIndex];
        const x = currentCell.x;
        const y = currentCell.y;

        // top left
        if ( x > 0 && y > 0 &&
             this.cells[cellIndex - this.width - 1].hasBomb ) count++;
        // top center
        if ( y > 0 &&
             this.cells[cellIndex - this.width].hasBomb ) count++;
        // top right
        if ( x < this.width - 1 && y > 0 &&
             this.cells[cellIndex - this.width + 1].hasBomb ) count++;
        // middle left
        if ( x > 0 &&
             this.cells[cellIndex - 1].hasBomb ) count++;
        // middle right
        if ( x < this.width - 1 &&
             this.cells[cellIndex + 1].hasBomb ) count++;
        // bottom left
        if ( x > 0 && y < this.height - 1 &&
             this.cells[cellIndex + this.width - 1].hasBomb ) count++;
        // bottom center
        if ( y < this.height - 1 &&
             this.cells[cellIndex + this.width].hasBomb ) count++;
        // bottom right
        if ( x < this.width - 1 && y < this.height - 1 &&
             this.cells[cellIndex + this.width + 1].hasBomb ) count++;

        return count;
    }

    isWin () {
        let cellsLeft = 0;
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            if (!cell.opened && !cell.hasBomb) {
                cellsLeft++;
            }                         
        }
        // if (cellsLeft === 0) {
        //     return true;
        // } else {
        //     return false;
        // }

        return cellsLeft === 0 ? true : false;
    }
    
    gameOver () {
        this.canPlay = false;
        this.smile.sad();
        this.timer.stop();
        console.log('GAME OVER...');
    }

    updateBombCounter (value) {
        this.bombCounter.update(value);
    }
}

const game = new Minesweeper('#game', 10, 10, 5);

console.log(game);