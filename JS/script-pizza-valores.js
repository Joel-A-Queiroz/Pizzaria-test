// PIZZAS — SCRIPT FINAL

const valor = document.querySelector('h2');
const valorDoce = document.querySelector('h3');
const valorMeioMeio = document.querySelector('#meio-a-meio');

let precoSalgada = 0;
let precoDoce = 0;
let precoMeia = 0;

function abrirCarrinho() {
    const carrinhoJaAberto = localStorage.getItem("janelaCarrinhoAberta") === "true";

    if (carrinhoJaAberto) {
        // Não abre nova aba — o storage event no carrinho já vai atualizar
        return;
    }

    // Só abre se ainda não tiver carrinho aberto
    localStorage.setItem("janelaCarrinhoAberta", "true");
    window.open("finalizar-compra.html", "janelaCarrinho");
}



// SALGADA
document.querySelector('#form-salgadas').addEventListener('submit', (event) => {
    event.preventDefault();

    const select = event.target.querySelector('select');
    const opcao = select.options[select.selectedIndex];

    precoSalgada = Number(opcao.dataset.preco);

    valor.innerText = `Você escolheu: ${opcao.textContent} - R$ ${precoSalgada},00`;

    somaValores();
});

// DOCE
document.querySelector('#form-doces').addEventListener('submit', (event) => {
    event.preventDefault();

    const select = event.target.querySelector('select');
    const opcao = select.options[select.selectedIndex];

    precoDoce = Number(opcao.dataset.preco);

    valorDoce.innerText = `Você escolheu: ${opcao.textContent} - R$ ${precoDoce},00`;

    somaValores();
});

// MEIO A MEIO
document.querySelector('#form-salgadas-meia').addEventListener('submit', (event) => {
    event.preventDefault();

    const select1 = document.querySelector('#meio-meio1');
    const select2 = document.querySelector('#meio-meio2');

    const preco1 = Number(select1.options[select1.selectedIndex].dataset.preco);
    const preco2 = Number(select2.options[select2.selectedIndex].dataset.preco);

    precoMeia = Math.round((preco1 + preco2) / 2);

    valorMeioMeio.innerText =
        `Você escolheu meia ${select1.options[select1.selectedIndex].textContent} e meia ${select2.options[select2.selectedIndex].textContent} - R$ ${precoMeia},00`;

    somaValores();
});

function somaValores() {
    const total = precoSalgada + precoDoce + precoMeia;
    document.querySelector('#total').innerText = `Total: R$ ${total},00`;
}

// BOTÃO ENVIAR AO CARRINHO
document.querySelector(".add-carrinho").addEventListener("click", () => {
    const total = precoSalgada + precoDoce + precoMeia;

    const item = {
        salgada: precoSalgada,
        doce: precoDoce,
        meia: precoMeia,
        total: total
    };

    // Lê o carrinho atual e adiciona o novo item
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoAtual.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    abrirCarrinho();
});


