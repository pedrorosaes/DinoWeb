const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
let jumping = false;
let isGameOver = false;
let position = 0;
let score = 0;

function handleKeyEvent(event) {
    if (event.keyCode === 32 && jumping === false) {
        dinoUp();  
    }

}


function dinoUp () {
    jumping = true;
    let jumpInterval = setInterval(()=> {
    if (position >= 150) {
        clearInterval(jumpInterval);
        let downInterval = setInterval(()=> {
            position -= 20;
            dino.style.bottom = position + 'px';
            if (position <= 0) {
                jumping = false;
                clearInterval(downInterval);

            }
        },20)
    }else {
        position += 20;
        dino.style.bottom = position + 'px';
    }        
        },20);
}

function startGame () {
    const cactus = document.createElement('div');
    let cactusPosition = 1410;
    let randomTime = Math.random() * 6000;

    if(isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);

    cactus.style.left = cactusPosition + 'px';
    
    let cactusMovingInterval = setInterval(()=>{
        if(cactusPosition < -60) {
            //Out of Screen
            score += 1;
            clearInterval(cactusMovingInterval);
            background.removeChild('cactus')
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Game Over
            isGameOver= true;
            clearInterval(cactusMovingInterval);
            document.body.innerHTML = `
            <div class="game-over">
                <h1>Game Over</h1>
                <h2>Score: ${score}</h2>
            </div>
            `;

        }else {
            //Runnin to the left
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
        }
    },20)

    setTimeout(startGame,randomTime);
}

startGame();
addEventListener('keyup',handleKeyEvent)