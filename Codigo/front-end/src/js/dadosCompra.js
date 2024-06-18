document.addEventListener('DOMContentLoaded', function () {
    // Pegar local storage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let userId = "";

    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ "token": token }),
        redirect: "follow"
    };

    fetch("https://pinhomultimidias.azurewebsites.net/usuario/tipoUser", requestOptions)
        .then(response => response.json())
        .then(result => {
            const { id } = result;
            userId = id;
            console.log("userId: ", userId);

            // Formulário
            var formulario = document.getElementById("form-dados-compra");

            formulario.addEventListener('submit', function (event) {
                event.preventDefault();

                var primeiroNome = document.getElementById('primeiroNome').value;
                var ultimoNome = document.getElementById('ultimoNome').value;
                var email = document.getElementById('email').value;
                var rua = document.getElementById('rua').value;
                var bairro = document.getElementById('bairro').value;
                var numero = document.getElementById('numero').value;
                var complemento = document.getElementById('complemento').value || null;
                var cpf = document.getElementById('cpf').value;
                var estado = document.getElementById('estado').value;
                var cidade = document.getElementById('cidade').value;
                var cep = document.getElementById('cep').value;
                var telefone = document.getElementById('telefone').value;

                var dadosFormulario = {
                    primeiroNome,
                    ultimoNome,
                    email,
                    estado,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    complemento,
                    cep,
                    telefone,
                    cpf
                };

                criarPedido(dadosFormulario)
                    .then(pedidoData => {
                        console.log('Pedido criado:', pedidoData.id);
                        return criarItemPedido(pedidoData.id);
                    })
                    .then(itemData => {
                        console.log('Itens do pedido criados:', itemData);
                        return criarPreferenciaPagamento(itemData);
                    })
                    .then(() => {
                        console.log('Preferência de pagamento criada com sucesso!');
                    })
                    .catch(error => {
                        console.error('Ocorreu um erro ao finalizar o pedido:', error);
                        alert('Ocorreu um erro ao finalizar o pedido. Por favor, tente novamente.');
                    });
            });
        })
        .catch(error => console.error('Erro ao obter userId:', error));

    async function criarPedido(dadosFormulario) {
        const pedidoRaw = {
            "status": 0,
            "usuario": { "id": userId },
            "dadosPedido": dadosFormulario,
            "itens": carrinho.map(produto => ({
                "produto": { "codigoProduto": produto.codigoProduto },
                "quantidade": produto.quantidade,
                "preco": produto.preco,
                "rastramento": "-" // Preencher conforme necessário
            }))
        };

        const pedidoOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(pedidoRaw),
            redirect: "follow"
        };

        try {
            const response = await fetch("https://pinhomultimidias.azurewebsites.net/pedido", pedidoOptions);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            throw new Error('Failed to create pedido: ' + error.message);
        }
    }

    async function criarItemPedido(pedidoId) {
        const itemPromises = carrinho.map(produto => {
            const itemRaw = {
                "pedido": { "id": pedidoId },
                "produto": { "codigoProduto": produto.codigoProduto },
                "quantidade": produto.quantidade,
                "preco": produto.preco
            };

            const itemOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(itemRaw),
                redirect: "follow"
            };

            return fetch("http://127.0.0.1:8080/item-pedido", itemOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    throw new Error('Failed to create item pedido: ' + error.message);
                });
        });

        return Promise.all(itemPromises);
    }

    async function criarPreferenciaPagamento(pedidoData) {
        const itensPagamento = pedidoData.map(item => ({
            "title": `Produto ${item.produto.codigoProduto}`,
            "quantity": item.quantidade,
            "unitPrice": item.preco,
            "pictureUrl": "" // Adicionar URL da imagem, se necessário
        }));

        const pagamentoOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(itensPagamento),
            redirect: "follow"
        };

        try {
            const response = await fetch("https://pinhomultimidias.azurewebsites.net/pagamento/create", pagamentoOptions);
            if (!response.ok) throw new Error('Network response was not ok');
            const sandboxInitPoint = await response.text();
            if (sandboxInitPoint) {
                window.location.href = sandboxInitPoint; // Redireciona o navegador para a URL do sandbox
            } else {
                console.error("Erro ao criar a preferência de pagamento");
            }
        } catch (error) {
            console.error('Erro ao criar a preferência de pagamento:', error);
            throw error;
        }
    }
});
