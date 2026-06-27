const tabela = document.querySelector("#tabela-carrinho tbody");
const totalFinal = document.querySelector("#total-final");
const limparCarrinho = document.querySelector(".apagar-todos-carrinho");


// Marca como aberto quando a página carrega
localStorage.setItem("janelaCarrinhoAberta", "true");

// Marca como fechado quando o usuário fechar a aba do carrinho
window.addEventListener("beforeunload", () => {
    localStorage.setItem("janelaCarrinhoAberta", "false");
});

// Resto do código existente...


// Recupera os dados do localStorage
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Renderiza a tabela
tabela.innerHTML = carrinho.map((item, index) => {
    let descricao = [];
    let precoItem = 0;

    // bebidas
    if (item.lata) {
        descricao.push("Bebida lata");
        precoItem += item.lata;
    }
    if (item.litro) {
        descricao.push("Bebida litro");
        precoItem += item.litro;
    }

    // pizzas
    if (item.salgada) {
        descricao.push("Pizza salgada");
        precoItem += item.salgada;
    }
    if (item.doce) {
        descricao.push("Pizza doce");
        precoItem += item.doce;
    }
    if (item.meia) {
        descricao.push("Pizza meia a meia");
        precoItem += item.meia;
    }

    return `
        <tr>
            <td>${index + 1}</td>
            <td>${descricao.join("<br>")}</td>
            <td>R$ ${precoItem},00</td>
            <td><button onclick="removerItem(${index})">Remover</button></td>
        </tr>
    `;
}).join("");

//  Calcula o total corretamente (sem duplicar)
const totalGeral = carrinho.reduce((acc, item) => {
    let precoItem = 0;
    if (item.lata) precoItem += item.lata;
    if (item.litro) precoItem += item.litro;
    if (item.salgada) precoItem += item.salgada;
    if (item.doce) precoItem += item.doce;
    if (item.meia) precoItem += item.meia;
    return acc + precoItem;
}, 0);

totalFinal.innerText = `Total geral: R$ ${totalGeral},00`;

// Função para remover item
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload();
}

// Limpar carrinho
limparCarrinho.addEventListener("click", () => {
    localStorage.removeItem("carrinho");
    location.reload();
});

window.addEventListener("storage", (event) => {
    if (event.key === "carrinho") {
        location.reload();
    }
});
