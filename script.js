// SELECTORS
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $gameTime = document.querySelector('#game-time');

const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'black', 'brown'];
let score = 0;


// EVENTS
$start.addEventListener('click', startGameFunc);
$gameTime.addEventListener('input', setGameTimeFunc);
$game.addEventListener('click', handleBoxClickFunc);


function startGameFunc(){
    $game.style.backgroundColor = '#fff';
    hide($start);
    $gameTime.setAttribute('disabled', 'true');
  
    score = 0;
    $result.textContent = score;


    const interval = setInterval(function(){
        let time = parseFloat( $time.textContent ); // 5.0

        if(time <= 0){
            clearInterval(interval);
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);

    renderBox();

}


function renderBox(){
    $game.innerHTML = '';

    let box = document.createElement('div');
    let boxSize = getRangom(30, 100); // 50
    let gameSize = $game.getBoundingClientRect(); // 300x300
    let maxTop = gameSize.height - boxSize; // 250
    let maxLEft = gameSize.width - boxSize; // 250
    let randomColorIndex = getRangom(0, colors.length);

    box.style.width = box.style.height = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.top = getRangom(0, maxTop) + 'px';
    box.style.left = getRangom(0, maxLEft) + 'px';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);

}


function handleBoxClickFunc(event){
    if(event.target.dataset.box){
        score++;
        $result.textContent = score;
        renderBox();
    }
}


function endGame(){
    $game.innerHTML = '';
    $game.style.backgroundColor = 'gray';
    show($start);
    $gameTime.removeAttribute('disabled');
    setGameTimeFunc();
    
    if(score < 2) $result.style.color = 'red';
    if(score > 5)  $result.style.color = 'green';
}


function setGameTimeFunc(){
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
}



function show($el){
    $el.classList.remove('hide');
}

function hide($el){
    $el.classList.add('hide');
}


function getRangom(min, max){
    const diff = max-min; 
    return Math.floor( Math.random() * diff + min ); 
}








