
const totalNiveis = 10;
let nivelAtual = 1;
let chances = 3;
let totalObstaculos = 3;
let popoEscondida = null;

const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");
const status = document.getElementById("status");

function startGame() {
    nivelAtual = 1;
    chances = 3;
    totalObstaculos = 3;
    message.textContent = "";
    document.getElementById("fim-de-jogo").style.display = "none";
    document.getElementById("desistencia").style.display = "none";
    loadNivel();
}

function loadNivel() {
    gameArea.innerHTML = "";
    message.textContent = "";
    chances = 3;
    totalObstaculos = 2 + nivelAtual;

    // Oculta todos os cenários
    const cenarios = document.querySelectorAll(".cenario");
    cenarios.forEach(c => c.style.display = "none");

    // Mostra o cenário correspondente ao nível
    const cenarioAtual = document.getElementById(`cenario${nivelAtual}`);
    if (cenarioAtual) {
        cenarioAtual.style.display = "block";
    }

    const positions = [];
    while (positions.length < totalObstaculos) {
        const x = Math.random() * 750;
        const y = Math.random() * 450;
        const key = `${Math.floor(x)}-${Math.floor(y)}`;
        if (!positions.includes(key)) {
            positions.push(key);
        }
    }

    const popoIndex = Math.floor(Math.random() * totalObstaculos);
    popoEscondida = popoIndex;

    positions.forEach((pos, index) => {
    
        const [x, y] = pos.split("-").map(Number);

        const obstacle = document.createElement("img");
        obstacle.src = "https://pngimg.com/uploads/question_mark/question_mark_PNG65.png";
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${x}px`;
        obstacle.style.top = `${y}px`;
        obstacle.dataset.index = index;

        obstacle.onclick = () => checkObstacle(obstacle, index);

        gameArea.appendChild(obstacle);
    });

    updateStatus();
}

function checkObstacle(obstacle, index) {
    if (index == popoEscondida) {
        obstacle.src = "https://media.tenor.com/wMxVaZibD5sAAAAj/popuko-pop-team-epic.gif";
        message.textContent = "🎉 Você encontrou Popo!";
        setTimeout(() => nextLevel(), 1500);
    } else {
        obstacle.style.transform = "translateY(80px)";
        obstacle.classList.add("hidden");
        chances--;
        if (chances > 0) {
            message.textContent = "❌ Popo não está aqui. Tente novamente!";
        } else {
            message.textContent = "";
            fimDeJogo();
        }
    }
    updateStatus();
}

function nextLevel() {
    if (nivelAtual < totalNiveis) {
        nivelAtual++;
        loadNivel();
    } else {
        message.textContent = "🏆 Parabéns! Você completou todos os níveis!";
        setTimeout(() => startGame(), 3000);
    }
}

function updateStatus() {
    status.textContent = `Nível: ${nivelAtual} | Chances restantes: ${chances}`;
}

function fimDeJogo() {
    const fimContainer = document.getElementById("fim-de-jogo");
    const fimImg = document.getElementById("img-fim");
    fimImg.src = "https://d1i01wkzwiao45.cloudfront.net/wp-content/uploads/2020/05/PTE_TV_Special_07.jpg";
    fimContainer.style.display = "flex";
}

function desistir() {
    document.getElementById("fim-de-jogo").style.display = "none";
    document.getElementById("desistencia").style.display = "flex";
}

window.onload = startGame;
