const jogo = document.getElementById("jogo");
const colunas = jogo.children;
let matriz = Array.from({length: 6}, () => Array(7).fill(0));
let jogador = "azul";
let vitoriasAzul = 0
let vitoriasAmarelo = 0

CriarJogo();
const telaDeVitoria = CriarTelaDeVitoria();
const btnReiniciar = document.getElementById("jogarNovamente");

Array.from(colunas).forEach(coluna => {
    const buracos = coluna.children;
    coluna.addEventListener("mouseover", () => {
        for(let i = 0; i < 5; i++){
            if(buracos[i + 1].classList[1] != "vazio" &&
               buracos[i + 1].classList[1] != `${jogador}Fantasma` &&
               buracos[i].classList[1] == "vazio"){
                buracos[i].classList.replace("vazio",`${jogador}Fantasma`);
                break;
            }
        }
        if(buracos[5].classList[1] == "vazio") buracos[5].classList.replace("vazio",`${jogador}Fantasma`);
    });

    coluna.addEventListener("mouseout", () => {
        for(let i = 0; i < 6; i++){
            if(buracos[i].classList[1] == `${jogador}Fantasma`)
                buracos[i].classList.replace(`${jogador}Fantasma`,"vazio");
        };
    });

    coluna.addEventListener("click", () => {
        for(let i = 0; i < 6; i++){
            if(buracos[i].classList[1] == `${jogador}Fantasma`){
                buracos[i].classList.replace(`${jogador}Fantasma`, `${jogador}`)

                let linhaPeça = Number(buracos[i].id);
                let colunaPeça = Number(coluna.id.slice(6));
                if(AlguemVenceu(linhaPeça, colunaPeça)){
                    CriarDivDesativadora();
                    jogador == "azul" ? vitoriasAzul++ : vitoriasAmarelo++;
                    telaDeVitoria.style.visibility = "visible"
                    telaDeVitoria.style.boxShadow = `0vh 0vh 4vh ${jogador == "azul" ? "blue" : "yellow"}`;
                    telaDeVitoria.children[0].innerHTML = `<span style="color: ${jogador == "azul" ? "blue" : "yellow"};">${jogador}</span> venceu`;
                    telaDeVitoria.children[1].innerHTML = `<samp style="color: blue;">${vitoriasAzul}</samp> x <samp style="color: yellow;">${vitoriasAmarelo}</samp>`;
                }

                jogador == "azul" ? jogador = "amarelo" : jogador = "azul";
            }
        }
    })
});

btnReiniciar.addEventListener("click", () => {
    matriz = Array.from({length: 6}, () => Array(7).fill(0));
    telaDeVitoria.style.visibility = "hidden"
    const blocker = document.getElementById("blocker");
    if(blocker) blocker.remove();
    Array.from(colunas).forEach(coluna => {
        Array.from(coluna.children).forEach(buraco => {
            buraco.classList.replace(buraco.classList[1], "vazio")
        })
    });
});

function AlguemVenceu(linhaPeça, colunaPeça){
    let peça = jogador == "azul" ? 1 : 2;
    matriz[linhaPeça][colunaPeça] = peça;

    return (venceuCimaBaixo(linhaPeça, colunaPeça, peça) ||
            venceuEsquerdaDireita(linhaPeça, colunaPeça, peça) ||
            venceuDiagonalCimaBaixo(linhaPeça, colunaPeça, peça) ||
            venceuDiagonalBaixoCima(linhaPeça, colunaPeça, peça));
}

function venceuCimaBaixo(linhaPeça, colunaPeça, peça){
    let conexoes = 1;
    for (let l = linhaPeça + 1, c = colunaPeça; l < 6; l++) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    for (let l = linhaPeça - 1, c = colunaPeça; l >= 0; l--) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    return conexoes >= 4;
}

function venceuEsquerdaDireita(linhaPeça, colunaPeça, peça){
    let conexoes = 1;
    for (let l = linhaPeça, c = colunaPeça + 1; c < 7; c++) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    for (let l = linhaPeça, c = colunaPeça - 1; c >= 0; c--) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    return conexoes >= 4;
}

function venceuDiagonalCimaBaixo(linhaPeça, colunaPeça, peça){
    let conexoes = 1;
    for (let l = linhaPeça + 1, c = colunaPeça + 1; c < 7 & l < 6; c++, l++) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    for (let l = linhaPeça - 1, c = colunaPeça - 1; c >= 0 &&  l >= 0; c--, l--) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    return conexoes >= 4;
}

function venceuDiagonalBaixoCima(linhaPeça, colunaPeça, peça){
    let conexoes = 1;
    for (let l = linhaPeça - 1, c = colunaPeça + 1; c < 7 && l >= 0; c++, l--) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    for (let l = linhaPeça + 1, c = colunaPeça - 1; c >= 0 &&  l < 6; c--, l++) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    return conexoes >= 4;
}

function CriarJogo() {
    for(let i = 0; i < 7; i++){
        const coluna = document.getElementById(`coluna${i}`)
        coluna.innerHTML = `  <div class="buraco vazio" id="0"></div>
                              <div class="buraco vazio" id="1"></div>
                              <div class="buraco vazio" id="2"></div>
                              <div class="buraco vazio" id="3"></div>
                              <div class="buraco vazio" id="4"></div>
                              <div class="buraco vazio" id="5"></div>`
    }
}

function CriarTelaDeVitoria(){
    const telaDeVitoria = document.createElement("div")
    telaDeVitoria.id = "painelDeVitoria"
    telaDeVitoria.innerHTML = ` <h1 id="resultado">ninguem venceu</h1>
                                <h1 id="placar"><samp style="color: blue;">0</samp> x <samp style="color: yellow;">0</samp></h1>
                                <div id="jogarNovamente">Jogar Novamente</div>`
    telaDeVitoria.style.visibility = "hidden"
    document.body.append(telaDeVitoria);
    return telaDeVitoria;
}

function CriarDivDesativadora(){
    const divDesativadora = document.createElement("div")

    divDesativadora.id = "blocker";
    divDesativadora.style.height = "100vh";
    divDesativadora.style.width = "100vw";
    divDesativadora.style.position = "fixed";
    divDesativadora.style.top = "0";
    divDesativadora.style.left = "0";
    divDesativadora.style.zIndex = "5";
    divDesativadora.style.backgroundColor = "transparent";

    document.body.append(divDesativadora)
}