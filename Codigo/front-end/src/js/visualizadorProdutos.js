document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    const container = document.getElementById('tela');
    const modalAlterar = document.getElementById('modal-alterar');
    const modalExcluir = document.getElementById('modal-excluir');

    // Função para verificar a opção selecionada e exibir os checkboxes se necessário
    function verificarOpcaoSelecionada() {
        var tipoProduto = document.getElementById('tipoProduto').value;
        var divCheckboxes = document.getElementById('checkboxesMultimidia');
        if (tipoProduto === 'MULTIMIDIA') {
            divCheckboxes.style.display = 'block';
        } else {
            divCheckboxes.style.display = 'none';
        }
    }

    // Função para pegar todos os produtos
    async function getProdutos() {
        const params = {
            page: 0,
            size: 30
        };

        const url = 'http://127.0.0.1:8080/produto';

        
        try {
            const response = await axios.get(url, { params });
            const produtos = response.data;
            produtos.forEach(produto => {
                container.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img class="card-img-top" src="./images/whatsapp-logo-2022.svg" alt="Imagem do Produto" style="width: 200px; height: 200px;">
                            <div class="card-body">
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text">Preço: R$${produto.preco}</p>
                                <p class="card-text">Ano Início: ${produto.anoInicio}</p>
                                <p class="card-text">Ano Fim: ${produto.anoFim}</p> 
                                <button class="btn btn-primary btn-block btn-alterar" data-produto-id="${produto.codigoProduto}">Editar</button>
                                <button class="btn btn-danger btn-block btn-excluir" data-produto-id="${produto.codigoProduto}">Excluir</button>
                            </div>
                        </div>
                    </div>`;
            });

            
            document.querySelectorAll('.btn-alterar').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const produtoId = this.getAttribute('data-produto-id');
                    console.log(produtoId, "produtoId");
                    modalAlterar.showModal();
            
                });
            });

            document.querySelectorAll('.btn-excluir').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const produtoId = this.getAttribute('data-produto-id');
                    console.log(produtoId, "produtoId");
                    modalExcluir.showModal();
                    // Lógica para abrir o modal de excluir com base no produtoId
                });
            });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    }

    getProdutos();
    verificarOpcaoSelecionada();

    document.getElementById('tipoProduto').addEventListener('change', verificarOpcaoSelecionada);

    // document.querySelectorAll('.btn-adicionar').forEach(function(btn) {
    //     btn.addEventListener('click', function() {
    //         var inputId = this.getAttribute('for');
    //         document.getElementById(inputId).click();
    //     });
    // });

});
