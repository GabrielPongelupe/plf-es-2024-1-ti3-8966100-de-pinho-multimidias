document.addEventListener('DOMContentLoaded', function () {
    // Pegar local storage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Pegar a token para fazer verificação se usuário está logado ou não
    const userId = localStorage.getItem('userId');

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

        var urlCadastroDadosCompra = "http://127.0.0.1:8080/dados-pedido";
        var urlPedido = "http://127.0.0.1:8080/pedido";
        var urlItemPedido = "http://127.0.0.1:8080/item-pedido";
        var token = localStorage.getItem("token");

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

            try {
                const response = await fetch(urlPedido, pedidoOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const pedidoData = await response.json();
                console.log('Pedido criado:', pedidoData.id);
                return pedidoData;  
            } catch (error) {
                console.error('Error creating order:', error);
                throw error;
            }
        }

        async function criarItemPedido(pedidoId) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const itemPromises = carrinho.map(produto => {
                const itemRaw = JSON.stringify({
                    "pedido": {
                        "id": pedidoId
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

                return fetch(urlItemPedido, itemOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(itemData => {
                        console.log('Item do pedido criado:', itemData);
                        return itemData;
                    })
                    .catch(error => {
                        console.error('Error creating order item:', error);
                        throw error;
                    });
            });

            return Promise.all(itemPromises);
        }

        async function cadastrarDadosCompra(pedidoId) {
            console.log('Pedido ID:', pedidoId)

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify({
                "primeiroNome": primeiroNome,
                "ultimoNome": ultimoNome,
                "email": email,
                "cpf": cpf,
                "rua": rua,
                "bairro": bairro,
                "numero": numero,
                "complemento": complemento,
                "estado": estado,
                "cidade": cidade,
                "cep": cep,
                "telefone": telefone,
                "pedido": {
                    "id": pedidoId  
                }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const response = await fetch(urlCadastroDadosCompra, requestOptions);
                if (!response.ok) {
                    throw new Error('Error registering purchase data');
                }
                const result = await response.json();
                console.log('Purchase data registered:', result);
            } catch (error) {
                console.error('Error registering purchase data:', error);
                throw error;
            }
        }

        // Fluxo principal
        criarPedido()
            .then(pedidoData => {
                console.log('Pedido criado:', pedidoData.id);
                return Promise.all([
                    cadastrarDadosCompra(pedidoData.id),  
                    criarItemPedido(pedidoData.id)         
                ]);
            })
            .then(() => {
                console.log('Pedido finalizado com sucesso!');
                alert('Pedido finalizado com sucesso!');
                
            })
            .catch(error => {
                console.error('Ocorreu um erro ao finalizar o pedido:', error);
                alert('Ocorreu um erro ao finalizar o pedido. Por favor, tente novamente.');
            });
    });
});
