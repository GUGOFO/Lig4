const jogo = document.getElementById("jogo");
const matriz = Array.from({length: 6}, () => Array(7).fill(0));
const colunas = jogo.children;
let jogador = "azul";

CriarJogo();

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
                if(AlguemVenceu(linhaPeça, colunaPeça)) console.log("VENCEUU")

                jogador == "azul" ? jogador = "amarelo" : jogador = "azul";
            }
        }
    })
});

function AlguemVenceu(linhaPeça, colunaPeça){
    let peça = jogador == "azul" ? 1 : 2;
    matriz[linhaPeça][colunaPeça] = peça;

    console.log(matriz)
    return verCimaBaixo(linhaPeça, colunaPeça, peça);
}

function verCimaBaixo(linhaPeça, colunaPeça, peça){
    let conexoes = 1;

    for (let l = linhaPeça + 1, c = colunaPeça; l < 6; l++) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }

    for (let l = linhaPeça - 1, c = colunaPeça; l >= 0; l--) {
        if (matriz[l][c] == peça) conexoes++;
        else break;
    }
    console.log(`${conexoes}`)
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