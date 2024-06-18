document.addEventListener('DOMContentLoaded', function() {

const container = document.getElementById('add-Pedido');
const userId = localStorage.getItem('userId');
const urlUsuario = `https://pinhomultimidias.azurewebsites.net/usuario/${userId}`;

  // Mapeamento de status
  const statusMap = {
    0: "Aguardando Pagamento",
    1: "Pago",
    2: "Enviado",
    3: "Cancelado"
  };

async function getPedidos() {

    try {
        const responseUser = await axios.get(urlUsuario);
        const pedidosUser = responseUser.data.pedidos;

      pedidosUser.forEach(pedido => {
        let produtosHtml = '';
        let totalPedido = 0;

        pedido.itens.forEach(item => {
          produtosHtml += `
            <div class="d-flex flex-row align-items-center produto me-5">
              <img src="${item.produto.imagemPrincipal}" alt="" />
              <div class="dados-produto">
                <ul class="p-0 m-0">
                  <li>${item.produto.nome}</li>
                  <li>
                    Código de rastreio:
                    <span class="codigoRastreio fw-bold">${item.rastramento}</span>
                    <i class="bi bi-copy" data-codigo="${item.rastramento}" title="Copiar código"></i>
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
          <div class="col-md-12">
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
                  </li>
                </ul>
                <a href="https://rastreamento.correios.com.br/app/index.php" target="_blank">
                  <button class="btn btn-primary">Rastrear itens <i class="bi bi-arrow-up-right-circle"></i></button>
                </a>
              </div>
              
              <hr class="w-100" />

              <!-- Dados pessoais -->
              <!-- Dados de entrega -->
              <div class="d-flex flex-row align-items-center py-4 dados-pessoais">
                <ul class="p-0 me-5">
                  <li class="tituloLista">Contato</li>
                  <li id="nome">${pedido.dadosPedido.primeiroNome} ${pedido.dadosPedido.ultimoNome}</li>
                  <li id="cpf">${pedido.dadosPedido.cpf}</li>
                  <li id="telefone">${pedido.dadosPedido.telefone}</li>
                  <li id="email">${pedido.dadosPedido.email}</li>
                </ul>
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
              <div class="d-flex flex-row align-items-center pt-4 produtos">
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

  async function addEventListeners() {
    const copyIcons = document.querySelectorAll('.bi-copy');
    
    copyIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const codigoRastreio = icon.getAttribute('data-codigo');
        navigator.clipboard.writeText(codigoRastreio).then(() => {
          alert('Código de rastreio copiado para a área de transferência!');
        }).catch(err => {
          console.error('Erro ao copiar o código de rastreio: ', err);
        });
      });
    });
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