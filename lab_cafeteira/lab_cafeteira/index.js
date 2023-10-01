let carregamento = false
document.querySelectorAll(".item").forEach(function (elem) {
    const localStorageInformacoes = JSON.parse(localStorage.getItem("produtos")) || [];
    if (localStorageInformacoes.length && !carregamento) {
        informacoesSalvasNoLocalStorage(localStorageInformacoes);
        carregamento = true;
    }
    elem.addEventListener("click", function (ev) {
        const item = ev.currentTarget;
        const nomeProduto = item.querySelector("figcaption").textContent;
        const preco = +(item.querySelector("span").textContent.slice(2, -3));
        salvarInformacoes(nomeProduto, preco, localStorageInformacoes);
    })
})


function adicionarProduto(elem, produto) {
    const li = document.createElement("li");
    li.textContent = produto;
    elem.appendChild(li);
}

function salvarInformacoes(nomeProduto, valor, localStorageInformacoes) {
    localStorageInformacoes.push({ nomeProduto, valor });
    localStorage.setItem("produtos", JSON.stringify(localStorageInformacoes));
    mostrarInformacoes({ nomeProduto, valor });
}

function informacoesSalvasNoLocalStorage(localStorageInformacoes) {
    localStorageInformacoes.forEach(mostrarInformacoes)
}
function calcularPreco(valorAtual, valor) {
    return valorAtual + valor;
}

function mostrarInformacoes({ nomeProduto, valor }) {
    const total = document.querySelector(".total");
    const ol = document.querySelector(".itens");
    adicionarProduto(ol, nomeProduto);
    total.textContent = calcularPreco(+total.textContent, valor);
}