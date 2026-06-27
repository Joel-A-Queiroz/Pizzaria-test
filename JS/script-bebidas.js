// BEBIDAS — SCRIPT FINAL

const valorBebida = document.querySelector('h3');
const valorBebidaLitro = document.querySelector('h4');

let precoLata = 0;
let precoLitro = 0;


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


// LATA
document.querySelector("#enviar-lata").addEventListener("click", () => {

    const select = document.querySelector('#escolha-bebida');
    const opcao = select.options[select.selectedIndex];

    precoLata = Number(opcao.dataset.preco);

    valorBebida.innerText =
        `Você escolheu ${opcao.textContent} com o valor de ${precoLata},00`;

    somarBebidas();
});

// LITRO
document.querySelector("#enviar-Litro").addEventListener("click", () => {

    const select = document.querySelector('#escolha-bebida2');
    const opcao = select.options[select.selectedIndex];

    precoLitro = Number(opcao.dataset.preco);

    valorBebidaLitro.innerText =
        `Você escolheu ${opcao.textContent} com o valor de ${precoLitro},00`;

    somarBebidas();
});

function somarBebidas() {
    const total = precoLata + precoLitro;
    document.querySelector('h5').innerText = `Total: ${total},00`;
}

// BOTÃO ENVIAR AO CARRINHO
document.querySelector(".add-carrinho").addEventListener("click", () => {
    const item = {
        lata: precoLata,
        litro: precoLitro,
        total: precoLata + precoLitro
    };

    //  Lê o carrinho atual e adiciona o novo item
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoAtual.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    abrirCarrinho();
});


