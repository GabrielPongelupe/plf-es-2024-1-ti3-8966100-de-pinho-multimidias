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

        var urlPedido = "https://pinhomultimidias.azurewebsites.net/pedido";
        var urlPagamento = "https://pinhomultimidias.azurewebsites.net/pagamento/create";
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
                    "produto": produto,
                    "quantidade": produto.quantidade,
                    "preco": produto.preco,
                    "rastramento": "" // Preencher conforme necessário
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
                //console.log('Pedido criado:', pedidoData.id);
                //console.log("Pedido data: ", pedidoData);
                return pedidoData;  
            } catch (error) {
                console.error('Error creating order:', error);
                throw error;
            }
        }

        async function criarPreferenciaPagamento(pedidoData) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            console.log("Pedido data dentro: ", pedidoData);

            const itensPagamento = pedidoData.itens.map(item => ({
                "title": `Produto ${item.produto.nome}`, // Adicionar título apropriado
                "quantity": item.quantidade,
                "unitPrice": item.preco,
                "pictureUrl": "" // Adicionar URL da imagem, se necessário
            }));

            const pagamentoRaw = JSON.stringify(itensPagamento);

            const pagamentoOptions = {
                method: "POST",
                headers: myHeaders,
                body: pagamentoRaw,
                redirect: "follow"
            };

            try {
                const response = await fetch(urlPagamento, pagamentoOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const sandboxInitPoint = await response.text();
                if (sandboxInitPoint) {
                    //console.log(sandboxInitPoint);
                    window.location.href = sandboxInitPoint; // Redireciona o navegador para a URL do sandbox
                } else {
                    console.error("Erro ao criar a preferência de pagamento");
                }
            } catch (error) {
                console.error('Erro ao criar a preferência de pagamento:', error);
                throw error;
            }
        }

        criarPedido()
            .then(pedidoData => {
                console.log('Pedido criado:', pedidoData.id);
                return criarPreferenciaPagamento(pedidoData);         
            })
            .then(() => {
                console.log('Preferência de pagamento criada com sucesso!');
            })
            .catch(error => {
                console.error('Ocorreu um erro ao finalizar o pedido:', error);
                alert('Ocorreu um erro ao finalizar o pedido. Por favor, tente novamente.');
            });
    });
});
