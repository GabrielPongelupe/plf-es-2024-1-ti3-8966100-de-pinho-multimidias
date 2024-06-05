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

  // Mapeamento de status
  const statusMap = {
    0: "Aguardando Pagamento",
    1: "Pago",
    2: "Enviado",
    3: "Cancelado"
  };

  // Função para mostrar todos os produtos na tela
  async function getPedidos() {
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
        let totalPedido = 0;

        pedido.itens.forEach(item => {
          produtosHtml += `
            <div class="d-flex flex-row align-items-center produto mb-5">
              <img src="${item.produto.imagemPrincipal}" alt="" />
              <div class="dados-produto">
                <ul class="p-0 m-0">
                  <li>Nome do produto: ${item.produto.nome}</li>
                  <li>
                    Código de rastreio:
                    <span class="codigoRastreio fw-bold">${item.rastramento}</span>
                    <i class="bi bi-pencil-square edit-rastreio-btn" data-item-id="${item.id}" data-pedido-id="${pedido.id}" data-pedido-preco="${item.produto.preco}" data-codigo="${item.rastramento}"></i>
                  </li>
                  <li>Quantidade: ${item.quantidade}</li>
                  <li class="fw-bold">R$${item.produto.preco.toFixed(2)}</li>
                </ul>
              </div>
            </div>
          `;
          totalPedido += item.produto.preco * item.quantidade;
        });

        const statusTexto = statusMap[pedido.status] || "Status Desconhecido";
        const dataFormatada = formatarData(pedido.momento);


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
                    <span id="dataPedido" class="fw-normal">${dataFormatada}</span>
                  </li>
                  <li>
                  <li class="tituloLista">
                    Status do pedido: <span id="statusPedido" class="fw-normal">${statusTexto}</span>
                    <i class="bi bi-pencil-square edit-status-btn" data-pedido-id="${pedido.id}" data-status="${pedido.status}"></i>
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
              <!-- Dados de entrega -->
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
              <!-- Produtos -->
              <div class="pt-4 produtos">
                ${produtosHtml}
              </div>
              <p class="mt-5 fw-bold">TOTAL DO PEDIDO: R$${totalPedido.toFixed(2)}</p>
            </div>
          </div>
        `;
      });

      // Adiciona event listeners após renderizar os pedidos
      addEventListeners();
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }

  // Função para adicionar event listeners aos botões de edição
  function addEventListeners() {
    document.querySelectorAll(".edit-rastreio-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const itemId = btn.getAttribute("data-item-id");
        const pedidoId = btn.getAttribute("data-pedido-id");
        const pedidoPreco = btn.getAttribute("data-pedido-preco");
        const codigo = btn.getAttribute("data-codigo");
        document.getElementById("rastreio-editar").value = codigo;
        modalEditarRastreio.showModal();

        concluirEdicaoRastreio.onclick = async () => {
          const novoCodigo = document.getElementById("rastreio-editar").value;
          try {
            const response = await axios.put(`http://127.0.0.1:8080/item-pedido/${itemId}`, {
              rastramento: novoCodigo // Incluindo o novo valor do rastramento no corpo da requisição
            });
            alert("Código de rastreio atualizado com sucesso!");
            modalEditarRastreio.close();
            window.location.reload();
          } catch (error) {
            console.error('Erro ao atualizar código de rastreio:', error);
          }
        };
        
      });
    });

    document.querySelectorAll(".edit-status-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const pedidoId = btn.getAttribute("data-pedido-id");
        const statusAtual = btn.getAttribute("data-status");
        document.getElementById("status-editar").value = statusAtual;
        modalEditarStatus.showModal();

        concluirEdicaoStatus.onclick = async () => {
          const novoStatus = document.getElementById("status-editar").value;
          try {
            const response = await axios.put(`http://127.0.0.1:8080/pedido/${pedidoId}`, {
              status: novoStatus
            });

              alert("Status do pedido atualizado com sucesso!");
              modalEditarStatus.close();
              window.location.reload();

          } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
          }
        };
      });
    });

    closestatusBtn.onclick = () => modalEditarStatus.close();
    closeRastreioBtn.onclick = () => modalEditarRastreio.close();
  }

  function formatarData(momentoArray) {
    const [ano, mes, dia, hora, minuto, segundo] = momentoArray;
    const data = new Date(ano, mes - 1, dia, hora, minuto, segundo);
    const diaFormatado = data.getDate().toString().padStart(2, '0');
    const mesFormatado = (data.getMonth() + 1).toString().padStart(2, '0');
    const anoFormatado = data.getFullYear();
    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
  }

  getPedidos();
});
