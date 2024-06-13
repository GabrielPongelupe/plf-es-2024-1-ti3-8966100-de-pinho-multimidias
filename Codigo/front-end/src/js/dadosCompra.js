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

        var urlPedido = "http://127.0.0.1:8080/pedido";
        var urlItemPedido = "http://127.0.0.1:8080/item-pedido";
        var token = localStorage.getItem("token");

        async function criarPedido() {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const pedidoRaw = JSON.stringify({
                "status": 0,
                "usuarioId": userId,
                "dadosPedido": {
                    "primeiroNome": primeiroNome,
                    "ultimoNome": ultimoNome,
                    "email": email,
                    "estado": estado,
                    "cidade": cidade,
                    "bairro": bairro,
                    "rua": rua,
                    "numero": numero,
                    "complemento": complemento,
                    "cep": cep,
                    "telefone": telefone,
                    "cpf": cpf
                },
                "itens": carrinho.map(produto => ({
                    "produtoId": produto.codigoProduto,
                    "quantidade": produto.quantidade,
                    "preco": produto.preco,
                    "rastramento": "" 
                }))
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

        criarPedido()
            .then(pedidoData => {
                console.log('Pedido criado com dados de compra:', pedidoData.id);
                alert('Pedido criado com sucesso!');
            })
            .catch(error => {
                console.error('Ocorreu um erro ao criar o pedido:', error);
                alert('Ocorreu um erro ao criar o pedido. Por favor, tente novamente.');
            });
    });
});
