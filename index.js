const jogo = document.getElementById("jogo");
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
                jogador == "azul" ? jogador = "amarelo" : jogador = "azul";
                console.log(jogador)
            }
        }
    })
});

function CriarJogo() {
    for(let i = 0; i < 7; i++){
        const coluna = document.getElementById(`coluna${i}`)
        coluna.innerHTML = `<div class="buraco vazio"></div>
                              <div class="buraco vazio"></div>
                              <div class="buraco vazio"></div>
                              <div class="buraco vazio"></div>
                              <div class="buraco vazio"></div>
                              <div class="buraco vazio"></div>`
    }
}