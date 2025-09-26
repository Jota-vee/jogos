let imgs = [];
let links = [];
let buscador = [];
let imgs_corretas = [];

let indice;
let indice_revelado;

let dificuldade = localStorage.getItem("dados");
let placar = document.querySelector("#placar");
let pontos = 0;

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
    for(let i = imgs.length; 1 > 0; i--){
        [imgs[i], imgs[i-2]] = [imgs[i-2], imgs[i]];
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
        if (dificuldade == "dificil"){
            console.log("em andamento");
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

            buscador = [];
        }
    }
}

window.onload = function() {
    instanciar();
    embaralhar();
};