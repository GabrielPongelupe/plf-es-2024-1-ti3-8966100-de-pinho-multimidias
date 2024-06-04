const addPedido = document.getElementById('add-Pedido');

async function exibirPedidos() {
    const urlPedidos = "http://127.0.0.1:8080/pedido/{id}";
    const urlItensPedido = "http://127.0.0.1:8080/item-pedido/{id}";

    try {
        const responsePedidos = await axios.get(urlPedidos);
        const pedidos = responsePedidos.data;

        for (const pedido of pedidos) {
            const responseItens = await axios.get(urlItensPedido.replace('{id}', pedido.id));
            const itensPedido = responseItens.data;
            
            let produtosHTML = '';
            for (const item of itensPedido) {
                produtosHTML += `
                    <div class="d-flex flex-row align-items-center me-5 produto">
                        <img src="${item.produto.imagem}" alt="">
                        <div class="dados-produto">
                            <ul class="p-0 m-0">
                                <li>${item.produto.nome}</li>
                                <li>Código de rastreio: <span class="codigoRastreio fw-bold">${item.codigoRastreio}</span> <i class="bi bi-copy" title="Copiar código"></i></li>
                                <li class="fw-bold">R$${item.preco}</li>
                            </ul>
                        </div>
                    </div>
                `;
            }

            addPedido.innerHTML += `
                <div class="pedido p-5 mt-4">
                    <!-- Dados do pedido -->
                    <div class="d-flex flex-row justify-content-between align-items-center pb-4">
                        <ul class="p-0 m-0">
                            <li class="tituloLista">ID do pedido: <span id="idPedido" class="fw-normal">${pedido.id}</span></li>
                            <li class="tituloLista">Data do pedido: <span id="dataPedido" class="fw-normal">${pedido.momento}</span></li>
                            <li class="tituloLista">Status: <span id="statusPedido" class="fw-normal">${pedido.status}</span></li>
                        </ul>
                        <button class="btn btn-primary">Rastrear pedido <i class="bi bi-arrow-up-right-circle"></i></button>
                    </div>
                    <hr class="w-100">
                    <!-- Dados pessoais -->
                    <div class="d-flex flex-row align-items-center py-4 dados-pessoais">
                        <ul class="p-0 me-5">
                            <li class="tituloLista">Contato</li>
                            <li id="nome">${pedido.dados_pedido.primeiroNome} ${pedido.dados_pedido.ultimoNome}</li>
                            <li id="cpf">${pedido.dados_pedido.cpf}</li>
                            <li id="telefone">${pedido.dados_pedido.telefone}</li>
                            <li id="email">${pedido.dados_pedido.email}</li>
                        </ul>
                        <ul class="p-0 me-6">
                            <li class="tituloLista">Endereço de entrega</li>
                            <li id="endereco">${pedido.dados_pedido.rua}, ${pedido.dados_pedido.numero} - ${pedido.dados_pedido.bairro}</li>
                            <li id="cidadeEstado">${pedido.dados_pedido.cidade} - ${pedido.dados_pedido.estado}</li>
                            <li id="cep">${pedido.dados_pedido.cep}</li>
                            <li id="complemento">${pedido.dados_pedido.complemento}</li>
                        </ul>
                    </div>
                    <hr class="w-100">
                    <!-- Produtos -->
                    <div class="d-flex flex-row align-items-center pt-4 produtos">
                        ${produtosHTML}
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao obter pedidos:', error);
    }
}

exibirPedidos();
