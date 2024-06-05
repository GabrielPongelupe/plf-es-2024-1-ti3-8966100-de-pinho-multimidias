document.addEventListener('DOMContentLoaded', function () {
    // variáveis
    const telaCarrinho = document.querySelector('#telaCarrinho');
    const telaCarrinhoVazio = document.querySelector('#telaCarrinhoVazio');
    const totalPriceElement = document.querySelector('#totalPrice');
    const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

    // pegar local storage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // pegar a token para fazer verificação se usuário está logado ou não
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // calcular preço total
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
                    <div class="col-lg-9">
                        <div class="alert alert-warning" role="alert">
                            Carrinho vazio!
                        </div>
                    </div>
                    <a href="index.html">Voltar para a página inicial</a>
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
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto removido do carrinho!');
        exibirCarrinho();
    }

    // Função para atualizar a quantidade de itens
    window.atualizarQuantidade = function (index, quantidade) {
        carrinho[index].quantidade = quantidade;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();
    }

    async function criarPedido() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const pedidoRaw = JSON.stringify({
            "momento": new Date().toISOString(),
            "status": 1,
            "itens": [],
            "usuario": {
                "id": userId
            },
            "pagamentos": []
        });

        const pedidoOptions = {
            method: "POST",
            headers: myHeaders,
            body: pedidoRaw,
            redirect: "follow"
        };

        const response = await fetch("http://127.0.0.1:8080/pedido", pedidoOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to parse JSON: ' + text);
        }
    }

    function criarItemPedido(pedidoId) {
        console.log('pedidoId:', pedidoId)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);


        const itemPromises = carrinho.map(produto => {
            const itemRaw = JSON.stringify({
                "pedido": {
                    "id": `${pedidoId}`
                },
                "produto": {
                    "codigoProduto": produto.codigoProduto
                },
                "quantidade": produto.quantidade,
                "preco": produto.preco
            });

            const itemOptions = {
                method: "POST",
                headers: myHeaders,
                body: itemRaw,
                redirect: "follow"
            };

            return fetch("http://127.0.0.1:8080/item-pedido", itemOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(text => {
                    try {
                        return JSON.parse(text);
                    } catch (error) {
                        throw new Error('Failed to parse JSON: ' + text);
                    }
                });
        });

        return Promise.all(itemPromises);
    }

    function finalizarCompra() {
        if (!token) {
            alert('Você precisa estar logado para finalizar a compra!')
            window.location.href = 'login.html';
            return;
        }

        criarPedido()
            .then(pedidoData => {
                console.log('Pedido criado:', pedidoData.id);
                return criarItemPedido(pedidoData.id);
            })
            .then(itemData => {
                console.log('Itens do pedido criados:', itemData);
                alert('Pedido gerado com sucesso!');
                window.location.href = 'insercaoDadosCompra.html';
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Ocorreu um erro ao finalizar o pedido. Por favor, tente novamente.');
            });
    }

    // Evento de finalizar compra
    btnFinalizarCompra.addEventListener('click', finalizarCompra);

    exibirCarrinho();
});
