document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tela");
  const editRastreioBtn = document.querySelectorAll(".edit-rastreio-btn");
  const editStatusBtn = document.querySelectorAll(".edit-status-btn");
  const modalEditarRastreio = document.getElementById("modal-editar-codigo-rastreio");
  const modalEditarStatus = document.getElementById("modal-editar-status");
  const closeRastreioBtn = document.getElementById("btn-modal-close-rastreio");
  const concluirEdicaoBtns = document.querySelectorAll(".concluir-edicao");

  const urlPedidos = "http://127.0.0.1:8080/pedido";
  const urlDadosCompra = "http://127.0.0.1:8080/dados-pedido/{id}";
  const urlItensPedido = "http://127.0.0.1:8080/item-pedido/{id}";

  // Função para mostrar todos os produtos na tela
  
  async function getPedidos() {
    //Paginação para dividir a visualização de produtos 
    const params = {
        page: 0,
        size: 20
    };

    try {
      const response = await axios.get(urlPedidos, { params });
      const pedidos = response.data;
      console.log(pedidos);

      pedidos.forEach(pedido => {
        container.innerHTML += `
        <div class="col-md-6">
        <div class="pedido p-5 mt-4">
            <!--Dados do pedido-->
            <div class="d-flex flex-row justify-content-between pb-4">
              <ul class="p-0 m-0">
                <li class="tituloLista">
                  ID do pedido: <span id="idPedido" class="fw-normal">${pedido.id}</span>
                </li>
                <li class="tituloLista">
                  Data do pedido:
                  <span id="dataPedido" class="fw-normal">${pedido.momento}</span>
                </li>

                <!-- ALTERAR PRA FAZER UM MODAL E ADICIONAR O DROPDOWN DENTRO DESSE MODAL -->
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
                <li id="nome">${pedido.dadosPedido.primeiroNome}</li>
                <li id="cpf">${pedido.dadosPedido.cpf}</li>
                <li id="telefone">${pedido.dadosPedido.telefone}</li>
                <li id="email">${pedido.dadosPedido.email}</li>
              </ul>
            </div>
  
            <hr class="w-100" />
  
            <!--Dados de entrega-->
            <div class="d-flex flex-row align-items-center py-4 dados-pessoais">
  
              <ul class="p-0 me-6">
                <li class="tituloLista">Endereço de entrega</li>
                <li id="endereco">${pedido.dadosPedido.rua}, ${pedido.dadosPedido.numero} - ${pedido.dadosPedido.bairro}</li>
                <li id="cidadeEstado">${pedido.dadosPedido.cidade} - ${pedido.dadosPedido.estado}</li>
                <li id="cep">${pedido.dadosPedido.cep}</li>
                <li id="complemento">${pedido.dadosPedido.complemento}</li>
              </ul>
            </div>
  
            <hr class="w-100" />
  
            <!--Produtos-->
            <div class="pt-4 produtos">

              <div class="d-flex flex-row align-items-center produto mb-5">
                <img
                  <!-- ALTERAR PRA FAZER UM FOR EACH NA LISTA ITENS -->
                  src="${pedido.itens.produto.imagem}"
                  alt=""
                />
  
                <div class="dados-produto">
                  <ul class="p-0 m-0">
                    <li>Nome do produto</li>
                    <li>
                      Código de rastreio:
                      <span class="codigoRastreio fw-bold">XYZ244</span>
                      <i class="bi bi-pencil-square edit-rastreio-btn"></i>
                    </li>
                    <li class="fw-bold">R$994,00</li>
                  </ul>
                </div>
              </div>
  
              <div class="d-flex flex-row align-items-center me-5 produto">
                <img
                  src="https://images.tcdn.com.br/img/img_prod/1197109/central_multimidia_navpro_quadcore_plus_11_1_0c1c487df3f7268223a07bf59365bc18.jpg"
                  alt=""
                />
  
                <div class="dados-produto">
                  <ul class="p-0 m-0">
                    <li>Nome do produto</li>
                    <li>
                      Código de rastreio:
                      <span class="codigoRastreio fw-bold">XYZ244</span>
                      <i class="bi bi-pencil-square edit-rastreio-btn"></i>
                    </li>
                    <li class="fw-bold">R$994,00</li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="mt-5 fw-bold">TOTAL DO PEDIDO: R$99999</p>
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

  //editRastreioBtn.forEach.addEventListener('click', openRastreioModal);

  // Event listeners para fechar modais
  closeRastreioBtn.addEventListener("click", closeRastreioModal);

  // Event listeners para botões de salvar (fechar modal)
  concluirEdicaoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeRastreioModal();
    });
  });
});
