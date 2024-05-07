document.addEventListener('DOMContentLoaded', function () {
    // Variáveis globais
    const container = document.getElementById('tela');
    const modalAlterar = document.getElementById('modal-alterar');
    const modalExcluir = document.getElementById('modal-excluir');
    const concluirExclusao = document.getElementById('concluir-exclusao');
    const concluirEdicao = document.getElementById('confirmar-edicao');

    // urls
    const urlExclusao = 'http://127.0.0.1:8080/produto/delete/';

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
            console.log(produtos);
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
                                <button class="btn btn-primary btn-block btn-alterar" data-produto-id="${produto.codigoProduto}" produto-nome="${produto.nome}" tipo-produto="${produto.tipoProduto}" ano-inicio="${produto.anoInicio}" ano-fim="${produto.anoFim}" produto-descricao="${produto.descricao}" possuiRadio="${produto.possuiRadioOriginal}" comandoVolante ="${produto.possuiComandoVolante}" preco-produto="${produto.preco}" video-produto="${produto.videoRelacionado}">Editar</button>
                                <button class="btn btn-danger btn-block btn-excluir" data-produto-id="${produto.codigoProduto}">Excluir</button>
                            </div>
                        </div>                                                                                                      
                    </div>`;
            });


            let produtoId = "";
            document.querySelectorAll('.btn-alterar').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    produtoId = this.getAttribute('data-produto-id');
                    const nomeProduto = this.getAttribute('produto-nome');
                    const tipoProduto = this.getAttribute('tipo-produto');
                    const anoInicio = this.getAttribute('ano-inicio');
                    const anoFim = this.getAttribute('ano-fim');
                    const descricao = this.getAttribute('produto-descricao');
                    const possuiRadio = this.getAttribute('possuiRadio');
                    const comandoVolante = this.getAttribute('comandoVolante');
                    const precoProduto = this.getAttribute('preco-produto');
                    const videoProduto = this.getAttribute('video-produto');

                    modalAlterar.showModal();

                    document.getElementById('nomeProduto').value = nomeProduto;
                    document.getElementById('tipoProduto').value = tipoProduto;
                    document.getElementById('precoProduto').value = precoProduto;
                    document.getElementById('anoInicio').value = anoInicio;
                    document.getElementById('anoFinal').value = anoFim;
                    document.getElementById('descricaoGrande').value = descricao;
                    document.getElementById('videoRelacionado').value = videoProduto;

                    let divCheckboxes = document.getElementById('checkboxesMultimidia');
                    if (tipoProduto === 'MULTIMIDIA') {
                        divCheckboxes.style.display = 'block';
                    } else {
                        divCheckboxes.style.display = 'none';
                    }
                    if (possuiRadio) {
                        document.getElementById('checkbox2').checked = true;
                    } else {
                        document.getElementById('checkbox2').checked = false;
                    }

                    if (comandoVolante) {
                        document.getElementById('checkbox1').checked = true;
                    } else {
                        document.getElementById('checkbox1').checked = false;
                    }
                });
            });

            document.querySelectorAll('#modal-alterar input').forEach(function (input) {
                input.addEventListener('change', function () {
                    const novoValor = this.value;
                    const campo = this.id;

                    const dadosAtualizados = {
                        [campo]: novoValor
                    };


                    concluirEdicao.addEventListener('click', function () {
                        axios.put(`http://127.0.0.1:8080/produto/${produtoId}`, dadosAtualizados);
                        alert(`Dados do campo ${campo} atualizados com sucesso`, response.data);
                        window.location.reload();

                    });
                });
            });

            document.querySelectorAll('.btn-excluir').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const produtoId = this.getAttribute('data-produto-id');
                    modalExcluir.showModal();

                    concluirExclusao.addEventListener('click', function () {
                        axios.delete(`http://127.0.0.1:8080/produto/delete/${produtoId}`);
                        alert("Produto excluído com sucesso!");
                        window.location.reload();
                    });

                });
            });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    }

    getProdutos();

});
