// Dados iniciais 
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let warning = '';
let turn = '';
let player = '';
let playing = false;
let countX = 0;
let countO = 0;

reset();

// Eventos do jogo
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach( item => {
    item.addEventListener('click', itemClick);
});

document.querySelector('.count_reset').addEventListener('click', resetcount);


// --- Funções ---

// função para recomeçar o jogo
function reset() {
    warning = '';

    turn = Math.round(Math.random());
    
    if(turn === 0){
        player = 'X';
    } else {
        player = 'O';
    };

    for(let i in board){
        board[i] = '';
    }

    showInfo();
    renderBoard();

    playing = true;
};

// função para mostrar as informações na tela

function showInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

    document.querySelector('.numberOs').innerHTML = countO;
    document.querySelector('.numberXs').innerHTML = countX;
};


// função para renderizar o tabuleiro
function renderBoard() {

    for(let i in board){
        let item = document.querySelector(`div[data-item = ${i}]`);
        item.innerHTML = board[i];
    }
    checkGame();
};

// função para adicionar X ou O
function itemClick(event) {
    let location = event.target.getAttribute('data-item');

    for(let i in board){
        if(playing){
        if(location === i && board[i] == ''){
            board[i] = player;
            document.querySelector(`div[data-item = ${i}]`).innerHTML = board[i];

            player = (player == 'X') ? 'O' : 'X';
            renderBoard();
        }}
    }

    showInfo();
};

// função para saber se damos continuidade no jogo ou não
function checkGame() {
    if(wins('X')){
        warning = "X é o vencedor!";

        countX +=1;

        playing = false;
    } else if(wins('O')){
        warning = "O é o vencedor!";

        countO +=1;

        playing = false;
    } else if(fullBoard()){
        warning = "Empate!";
        playing = false;
    }
};

// função para definir o ganhador
function wins(item){
    let toWin = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let i in toWin){
        let tArray = toWin[i].split(',');
        let hasWon = tArray.every((op)=>board[op] === item);
        if (hasWon) return true;

    };
    return false;
};

// verificar o empate 

function fullBoard(){
    for( let i in board){
        if(board[i] === ''){
            return false;
        };
    };
    return true; // mostra que está tudo preeenchido
}

function resetcount(){
    countO = 0;
    countX = 0;

    for(let i in board){
        board[i] = '';
    }
    
    renderBoard();
    showInfo();
}