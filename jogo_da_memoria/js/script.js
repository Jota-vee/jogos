// dificil

let p1 = [];
let p2 = [];
let p3 = [];
let p4 = [];
let contador_de_giro = 1;
let src_corretas = [];
let posicao

// facil

let indice_revelado;

// jogo base

let imgs = [];
let links = [];
let buscador = [];
let imgs_corretas = [];
let indice;

let dificuldade = localStorage.getItem("dados");
let placar = document.querySelector("#placar");
let pontos = 0;

// audios

let acerto = new Audio("../audios/acerto.mp3");
acerto.playbackRate = 4;
let erro = new Audio("../audios/erro.mp3");
erro.playbackRate = 4;


function dados_iniciais() {
    let dif = document.querySelector("#dificuldade").value;
    localStorage.setItem("dados", dif);
    document.querySelector("#exibir_dificuldade").textContent=`${dificuldade}`;
}

function reiniciar(){
    location.reload();
}

function facil() {
    if (buscador.length < 2){
        for(let i = 0; i<links.length; i++){
            if(i != indice){
                if(links[indice] == links[i]){
                    imgs[i].style.border="3px solid blue";
                    return i;
                }
            }
        }
    }
}

function dificil(){
    if(contador_de_giro == 1){
        links.length = 0;
        links = p2.slice();
    }
    else if(contador_de_giro == 2){
        links.length = 0;
        links = p3.slice();
    }
    else if(contador_de_giro == 3){
        links.length = 0;
        links = p4.slice();
    }
    else{
        links.length = 0;
        links = p1.slice();
        contador_de_giro = 0;
    }
    contador_de_giro ++;
}

function atualizar_posicoes(){
    for(let i = imgs.length -1; i >= 0; i--){
        imgs[i].src="../img/ilha.jpg"
        imgs[i].style.border="3px solid black";
    }

    imgs_corretas = [];
    
    if (src_corretas.length > 0){

        for(let i = src_corretas.length -1; i>=0;i--){

            posicao = links.indexOf(src_corretas[i]);
            imgs_corretas.push(imgs[posicao]);
            imgs[posicao].src = links[posicao];
            imgs[posicao].style.border="3px solid green";

            posicao = links.lastIndexOf(src_corretas[i]);
            imgs_corretas.push(imgs[posicao]);
            imgs[posicao].src = links[posicao];
            imgs[posicao].style.border="3px solid green";
        }
    }

}

function instanciar() {

    imgs = [];
    links = [];

    for (let i = 1; i <= 16; i++) {
        let img = document.querySelector(`#img${i}`);
        imgs.push(img);

        if (i <= 8 ){
            let link = `../img/img${i}.jpg`;
            links.push(link);
            links.push(link);
        }
    }
}

function embaralhar() {
    for (let i = links.length - 1; i > 0; i--) {
        let index = Math.floor(Math.random() * (i + 1));
        [links[i], links[index]] = [links[index], links[i]];
    }
    for(let i = 0; i < links.length; i++){
        p1.push(links[i]);
    }
    for(let i = 3; i >= 0; i--){
        p4.push(links[i]);
        p4.push(links[i+4]);
        p4.push(links[i+8]);
        p4.push(links[i+12]);
    }
    for(let i = p4.length - 1; i >= 0; i--){
        p2.push(p4[i]);
    }
    for(let i = p1.length - 1; i >= 0; i--){
        p3.push(p1[i]);
    }
}

function virar_img(id) {

    indice = parseInt(id.slice(3, id.length)) -1;

    if (buscador.includes(imgs[indice])){
        return null;
    }

    if(buscador.length == 0){

        if (dificuldade == "facil"){
            indice_revelado = facil();
        }
    }
    if (buscador.length < 2 & !imgs_corretas.includes(imgs[indice])){

        imgs[indice].style.border="3px solid blue";
        buscador.push(imgs[indice]);

        imgs[indice].src = links[indice];
    } 

    if (buscador.length == 2){

        if (buscador[0].src != buscador[1].src){

            buscador[0].style.border="3px solid red";
            buscador[1].style.border="3px solid red";
            erro.play();
            setTimeout(() => {
                buscador[0].src = "../img/ilha.jpg";
                buscador[1].src = "../img/ilha.jpg";
                buscador[0].style.border="3px solid black";
                buscador[1].style.border="3px solid black";
                buscador = [];
                if(dificuldade == "facil"){
                    imgs[indice_revelado].style.border="3px solid black";
                }
            }, 1000);
            if (dificuldade == "dificil"){
                dificil();
            }
            if (dificuldade == "impossivel"){
                embaralhar();
            }
        }
        else {

            buscador[0].style.border="3px solid green";
            buscador[1].style.border="3px solid green";
            acerto.play();
            pontos += 1;
            placar.textContent =`Pontuação ${pontos}/8`;

            imgs_corretas.push(buscador[0]);
            imgs_corretas.push(buscador[1]);

            if (dificuldade=="dificil" | dificuldade=="impossivel"){
                let src = links[imgs.indexOf(buscador[0])];
                src_corretas.push(src);
            }
            if (dificuldade == "dificil"){
                dificil();
            }
            if (dificuldade == "impossivel"){
                embaralhar();
            }

            buscador = [];
        }
        if (dificuldade=="dificil" | dificuldade=="impossivel"){
            setTimeout(() => {
                atualizar_posicoes();
            }, 1000);
        }
    }
}

window.onload = function() {
    instanciar();
    embaralhar();
};