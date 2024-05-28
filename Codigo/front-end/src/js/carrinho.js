document.addEventListener('DOMContentLoaded', function () {
    // variáveis
    const telaCarrinho = document.querySelector('#telaCarrinho');
    const telaCarrinhoVazio = document.querySelector('#telaCarrinhoVazio');
    const totalPriceElement = document.querySelector('#totalPrice');
    const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

    // pegar local storage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //apagar o pedido do localstorage
    let pedido = [];

    // pegar a token para fazer verificação se usuario ta logado ou nao
    const token = localStorage.getItem('token');

    // calcular preco total
    function calcularPrecoTotal() {
        let precoTotal = 0;
        carrinho.forEach(produto => {
            precoTotal += produto.preco * produto.quantidade;
        });
        return precoTotal;
    }

    // Exibir o carrinho na tela
    function exibirCarrinho() {
        telaCarrinho.innerHTML = '';

        if (carrinho.length > 0) {
            carrinho.forEach((produto, index) => {
                telaCarrinho.innerHTML += `
                <div class="row gy-3 mb-4">
                <div class="col-lg-3">
                    <img src="${produto.imagemProduto}" class="border rounded w-100" style="max-width: 192px; height: auto;" />
                </div>
                <div class="col-lg-6">
                    <div class="me-lg-5">
                        <p class="mb-0">${produto.nome}</p>
                        <small class="h6">Preço da unidade: R$${produto.preco}</small>
                        <br>
                        <small class="text-muted">Multimídia válida de ${produto.anoInicio} a ${produto.anoFim}</small>
                    </div>
                </div>
                <div class="col-lg-1 col-sm-6 col-6">
                    <select class="form-select" onchange="atualizarQuantidade(${index}, this.value)">
                        <option ${produto.quantidade == 1 ? 'selected' : ''}>1</option>
                        <option ${produto.quantidade == 2 ? 'selected' : ''}>2</option>
                        <option ${produto.quantidade == 3 ? 'selected' : ''}>3</option>
                        <option ${produto.quantidade == 4 ? 'selected' : ''}>4</option>
                    </select>
                </div>
                <div class="col-lg-2 col-sm-6 col-6">
                    <button class="btn btn-light border text-danger icon-hover-danger" onclick="removerItem(${index})">Remover</button>
                </div>
            </div>
            

                `;
            });
        } else {
            telaCarrinhoVazio.innerHTML = `
            <div class="container">
      <div class="row">
        <!-- cart -->
        <div class="col-lg-9">
            <div class="alert alert-warning" role="alert">
                Carrinho vazio!
            </div>
        </div>
        <a href="index.html">Voltar para a página inicial</a>
        <!-- cart -->
    </div>
</div>    
            `;
        }

        const precoTotal = calcularPrecoTotal();
        totalPriceElement.textContent = `R$${precoTotal.toFixed(2)}`;

    }

    // Função para remover item do carrinho
    window.removerItem = function (index) {
        carrinho.splice(index, 1);
        pedido.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        localStorage.setItem('pedido', JSON.stringify(pedido));
        alert('Produto removido do carrinho!');
        exibirCarrinho();
    }

    // Função para atualizar a quantidade de itens
    window.atualizarQuantidade = function (index, quantidade) {
        //limpar pedidos anteriores
        pedido = [];
        carrinho[index].quantidade = quantidade;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();
    }

    // Evento de finalizar compra
    btnFinalizarCompra.addEventListener('click', function () {
        const precoPedido = calcularPrecoTotal();
        const nomeProduto = carrinho[0].nome;
        pedido.push({ nomeProduto, precoPedido });
        localStorage.setItem('pedido', JSON.stringify(pedido));
        alert('Pedido gerado com sucesso!');
        if(token == null)
            window.location.href = 'login.html';
        else
        window.location.href = 'insercaoDadosCompra.html';

    });

    exibirCarrinho();
});
