const formulario1 = document.querySelector('#form-salgadas')
const formulario2 = document.querySelector('#form-doces')
const formMeia = document.querySelector('#form-salgadas-meia')
const pizzaMeia = document.querySelector('#meio-meio1')
const pizzaMeia2 = document.querySelector('#meio-meio2')
const valor = document.querySelector('h2')
const valorDoce = document.querySelector('h3')
const valorMeioMeio = document.querySelector('#meio-a-meio')

let precoSalgada = 0
let precoDoce = 0
let salgadaMeia = 0

formulario1.addEventListener('submit', (event) => {
    event.preventDefault();

    const select = event.target.querySelector('select')
    const opcao = select.options[select.selectedIndex]

    const nome = opcao.textContent
    const preco = Number(opcao.dataset.preco)

    precoSalgada = preco

    valor.innerText = `Você escolheu: ${nome} - R$ ${preco},00`

    somaValores()
})

formulario2.addEventListener('submit', (event) => {
    event.preventDefault();

    const select2 = event.target.querySelector('select')
    const opcaoDoce = select2.options[select2.selectedIndex]

    const nomeDoce = opcaoDoce.textContent
    const precoDoceValor = Number(opcaoDoce.dataset.preco)

    precoDoce = precoDoceValor

    valorDoce.innerText = `Você escolheu: ${nomeDoce} - R$ ${precoDoceValor},00`

    somaValores()
})

function somaValores() {
    const total = precoSalgada + precoDoce + salgadaMeia
    document.querySelector('#total').innerText = `Total: R$ ${total},00`
}

formMeia.addEventListener('submit', (event) => {
    event.preventDefault();

    const opcao1 = pizzaMeia.options[pizzaMeia.selectedIndex]
    const opcao2 = pizzaMeia2.options[pizzaMeia2.selectedIndex]

    const nome1 = opcao1.textContent;
    const nome2 = opcao2.textContent;

    const preco1 = Number(opcao1.dataset.preco)
    const preco2 = Number(opcao2.dataset.preco)

    //Calculo do praço é a média de valores da duas pizzas
    salgadaMeia = Math.round((preco1 + preco2) / 2);

    valorMeioMeio.innerText = `Você escolheu meia ${nome1} e meia ${nome2} - R$ ${precoSalgada},00`

    somaValores();
})
