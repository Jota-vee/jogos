function dados_iniciais() {
    let dif = document.querySelector("#dificuldade").value;
    localStorage.setItem("dados", dif);
}