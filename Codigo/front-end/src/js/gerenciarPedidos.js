document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tela");
  const editRastreioBtn = document.querySelectorAll(".edit-rastreio-btn");
  const editStatusBtn = document.querySelectorAll(".edit-status-btn");
  const modalEditarRastreio = document.getElementById("modal-editar-codigo-rastreio");
  const modalEditarStatus = document.getElementById("modal-editar-status");
  const closestatusBtn = document.getElementById("btn-modal-close-status");
  const closeRastreioBtn = document.getElementById("btn-modal-close-rastreio");
  const concluirEdicaoStatus = document.getElementById("concluir-edicao-status");
  const concluirEdicaoRastreio = document.getElementById("concluir-edicao-rastreio");

  const urlPedidos = "http://127.0.0.1:8080/pedido";
  const urlDadosCompra = "http://127.0.0.1:8080/dados-pedido/{id}";
  const urlItensPedido = "http://127.0.0.1:8080/item-pedido/{id}";

  // Função para mostrar todos os produtos na tela
  async function getPedidos() {
    // Paginação para dividir a visualização de produtos 
    const params = {
        page: 0,
        size: 20
    };

    try {
      const response = await axios.get(urlPedidos, { params });
      const pedidos = response.data;
      console.log(pedidos);

      pedidos.forEach(pedido => {
        let produtosHtml = '';

        pedido.itens.forEach(item => {
          produtosHtml += `
            <div class="d-flex flex-row align-items-center produto mb-5">
              <img src="${item.produto.imagem}" alt="" />
              <div class="dados-produto">
                <ul class="p-0 m-0">
                  <li>Nome do produto: ${item.produto.nome}</li>
                  <li>
                    Código de rastreio:
                    <span class="codigoRastreio fw-bold">${item.codigoRastreio}</span> //DEVE SER TIRADO O CODIGO DE RASTREIO
                    <i class="bi bi-pencil-square edit-rastreio-btn"></i>
                  </li>
                  <li class="fw-bold">R$${item.produto.preco.toFixed(2)}</li>
                </ul>
              </div>
            </div>
          `;
        });

        container.innerHTML += `
          <div class="col-md-6">
            <div class="pedido p-5 mt-4">
              <!-- Dados do pedido -->
              <div class="d-flex flex-row justify-content-between pb-4">
                <ul class="p-0 m-0">
                  <li class="tituloLista">
                    ID do pedido: <span id="idPedido" class="fw-normal">${pedido.id}</span>
                  </li>
                  <li class="tituloLista">
                    Data do pedido:
                    <span id="dataPedido" class="fw-normal">${pedido.momento}</span>
                  </li>
                  <li>
                    <label for="tipoProduto">Status</label>
                    <select class="form-control" id="status">
                      <option value="0">Aguardando Pagamento</option>
                      <option value="1">Pago</option>
                      <option value="2">Enviado</option>
                      <option value="3">Cancelado</option>
                    </select>
                  </li>
                </ul>
                <ul class="p-0 me-5">
                  <li class="tituloLista">Contato</li>
                  <li id="nome">${pedido.dados_pedido.primeiroNome}</li>
                  <li id="cpf">${pedido.dados_pedido.cpf}</li>
                  <li id="telefone">${pedido.dados_pedido.telefone}</li>
                  <li id="email">${pedido.dados_pedido.email}</li>
                </ul>
              </div>
              <hr class="w-100" />
              <!-- Dados de entrega -->
              <div class="d-flex flex-row align-items-center py-4 dados-pessoais">
                <ul class="p-0 me-6">
                  <li class="tituloLista">Endereço de entrega</li>
                  <li id="endereco">${pedido.dados_pedido.rua}, ${pedido.dados_pedido.numero} - ${pedido.dados_pedido.bairro}</li>
                  <li id="cidadeEstado">${pedido.dados_pedido.cidade} - ${pedido.dados_pedido.estado}</li>
                  <li id="cep">${pedido.dados_pedido.cep}</li>
                  <li id="complemento">${pedido.dados_pedido.complemento}</li>
                </ul>
              </div>
              <hr class="w-100" />
              <!-- Produtos -->
              <div class="pt-4 produtos">
                ${produtosHtml}
              </div>
              <p class="mt-5 fw-bold">TOTAL DO PEDIDO: R$${pedido.total.toFixed(2)}</p>
            </div>
          </div>
        `;
      });
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }

  // Função para abrir modal de editar código de rastreio
  function openRastreioModal() {
    modalEditarRastreio.showModal();
  }

  // Função para fechar modal de editar código de rastreio
  function closeRastreioModal() {
    modalEditarRastreio.close();
  }

  // Função para abrir modal de status
  function openStatusModal() {
    modalEditarStatus.showModal();
  }

  // Função para fechar modal de editar código de rastreio
  function closeStatusModal() {
    modalEditarStatus.close();
  }

  // Event listeners para abrir modais
  editRastreioBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openRastreioModal();
    });
  });

  editStatusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openStatusModal();
    });
  });

  // Event listeners para fechar modais
  closestatusBtn.addEventListener("click", closeStatusModal);
  closeRastreioBtn.addEventListener("click", closeRastreioModal);

  // Event listeners para botões de salvar (fechar modal)
  concluirEdicaoStatus.addEventListener("click", () => {
    closeStatusModal();
  });

  concluirEdicaoRastreio.addEventListener("click", () => {
    closeRastreioModal();
  });

  // Chamada inicial para obter pedidos
  getPedidos();
});
