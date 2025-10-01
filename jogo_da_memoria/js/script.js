// dificil

let p1 = [];
let p2 = [];
let p3 = [];
let p4 = [];
let clock = 1;
let src_corretas = [];
let index01

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
    if(clock == 1){
        links.length = 0;
        links = p2.slice();
    }
    else if(clock == 2){
        links.length = 0;
        links = p3.slice();
    }
    else if(clock == 3){
        links.length = 0;
        links = p4.slice();
    }
    else{
        links.length = 0;
        links = p1.slice();
        clock = 0;
    }
    clock ++;
}

function complemento_dificil(){
    for(let i = imgs.length -1; i >= 0; i--){
        imgs[i].src="../img/ilha.jpg"
        imgs[i].style.border="3px solid black";
    }
    if (src_corretas.length > 0){
        let cont = 0;
        for(let i = src_corretas.length -1; i>=0;i--){
            if (cont == 0){
                index01 = links.indexOf(src_corretas[i]);
                console.log(index01);
            }
            else{
                index01 = links.lastIndexOf(src_corretas[i]);
                console.log(index01);
                cont = -1;
            }
            cont ++;
            console.log(cont)
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
    else{
        if (dificuldade == "dificil"){
            dificil();
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
        }
        else {

            buscador[0].style.border="3px solid green";
            buscador[1].style.border="3px solid green";
            acerto.play();
            pontos += 1;
            placar.textContent =`Pontuação ${pontos}/8`;

            imgs_corretas.push(buscador[0]);
            imgs_corretas.push(buscador[1]);

            if (dificuldade=="dificil"){
                let index1 = imgs.indexOf(buscador[0]);
                let index2 = imgs.indexOf(buscador[2]);

                src_corretas.push(imgs[index1]);
                src_corretas.push(imgs[index2]);
            }
            buscador = [];
        }
        if (dificuldade=="dificil"){
            setTimeout(() => {
                complemento_dificil();
            }, 1000);
        }
    }
}

window.onload = function() {
    instanciar();
    embaralhar();
};