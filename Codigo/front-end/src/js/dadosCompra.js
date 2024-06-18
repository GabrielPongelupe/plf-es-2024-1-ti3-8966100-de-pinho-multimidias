document.addEventListener('DOMContentLoaded', function () {
    // Pegar local storage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let userId = "";

    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({ "token": `${token}` });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://pinhomultimidias.azurewebsites.net/usuario/tipoUser", requestOptions)
        .then(response => response.json())
        .then(result => {
            const { id } = result;
            userId = id;
            console.log("userId: ", userId);
        })
        .catch(error => console.error('Erro ao obter userId:', error));

    async function criarPedido(dadosFormulario) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const pedidoRaw = JSON.stringify({
            "status": 0,
            "usuario": { "id": userId },
            "dadosPedido": dadosFormulario,
            "itens": carrinho.map(produto => ({
                "produto": {
                    "codigoProduto": produto.codigoProduto
                },
                "quantidade": produto.quantidade,
                "preco": produto.preco,
                "rastramento": "-" // Preencher conforme necessário
            }))
        });

        console.log("Pedido raw: ", pedidoRaw)
        console.log(pedidoRaw.itens);

        const pedidoOptions = {
            method: "POST",
            headers: myHeaders,
            body: pedidoRaw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://pinhomultimidias.azurewebsites.net/pedido", pedidoOptions);
            if (!response.ok) throw new Error('Network response was not ok');
            const text = await response.text();
            return JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to create pedido: ' + error.message);
        }
    }

    async function criarPreferenciaPagamento(pedidoData) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log("Pedido data dentro: ", pedidoData);

        const itensPagamento = pedidoData.itens.map(item => ({
            "title": `Produto ${item.produto.codigoProduto}`, // Ajuste conforme necessário
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

    // Formulário
    var formulario = document.getElementById("form-dados-compra");

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        console.log("userId: ", userId);

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
                //return criarPreferenciaPagamento(pedidoData);
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
