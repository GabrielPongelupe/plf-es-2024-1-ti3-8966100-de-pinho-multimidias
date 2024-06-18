document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('tela');
    const modalAlterar = document.getElementById('modal-alterar');
    const modalExcluir = document.getElementById('modal-excluir');
    const concluirExclusao = document.getElementById('concluir-exclusao');
    const concluirEdicao = document.getElementById('confirmar-edicao');
    let produtoIdAtual = null;  // Variável para armazenar o ID do produto a ser editado ou excluído
    var botaoConcluirCadastro = document.getElementById("btn-cadastrar-produto");
    var botaoAbrirModal = document.getElementById("btn-abrir-modal-cadastro");
    var formulario = document.getElementById("forms-cadastro-produto");
    const modalAdicionarProduto = document.getElementById('modal-adicionar-produto');
    const btnFecharModalAdicionarProduto = document.getElementById('fechar-modal-adicionar-produto');



    // Adicionar evento de mudança para verificar a opção selecionada
    document.getElementById('tipoProduto').addEventListener('change', verificarOpcaoSelecionada);



    // adicionar produtos
    formulario.addEventListener('submit', async function (event) {

        event.preventDefault();

        var nome = document.getElementById("nomeProduto").value;
        var tipoProduto = document.getElementById("tipoProduto").value;
        var preco = parseFloat(document.getElementById("precoProduto").value);
        var comandoVolante = document.getElementById("checkbox1").checked;
        var radioOriginal = document.getElementById("checkbox2").checked;
        var anoInicio = parseInt(document.getElementById("anoInicial").value);
        var anoFinal = parseInt(document.getElementById("anoFinal").value);
        var videoRelacionado = document.getElementById("videoRelacionado").value;
        var descricao = document.getElementById("descricaoGrande").value;

        // Coletando os URLs das imagens
        var imagemProduto1 = document.getElementById("imagemAddProduto1").value;
        var imagemProduto2 = document.getElementById("imagemAddProduto2").value;
        var imagemProduto3 = document.getElementById("imagemAddProduto3").value;
        var imagemProduto4 = document.getElementById("imagemAddProduto4").value;

        // url 
        var urlCadastroProduto = "https://pinhomultimidias.azurewebsites.net/produto";

        // token da localstorage
        var token = localStorage.getItem("token");

        // funcao para cadastrar produto
        async function cadastrarProduto() {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify({
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "anoInicio": anoInicio,
                "anoFim": anoFinal,
                "videoRelacionado": videoRelacionado,
                "tipoProduto": tipoProduto,
                "possuiComandoVolante": comandoVolante,
                "possuiRadioOriginal": radioOriginal,
                "imagemPrincipal": imagemProduto1,
                "imagem": imagemProduto2,
                "imagem2": imagemProduto3,
                "imagem3": imagemProduto4
            });

            console.log(raw,"raw")

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };


            try {
                const response = await fetch(urlCadastroProduto, requestOptions);
                const result = await response.text();
                console.log(response)
                console.log(result);
                alert("Cadastro realizado com sucesso");
                modalAdicionarProduto.close();
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }



        await cadastrarProduto();

    });

    botaoAbrirModal.addEventListener("click", function () {
        modalAdicionarProduto.showModal();
    });

    

    btnFecharModalAdicionarProduto.addEventListener("click", function () {
        event.preventDefault();
        modalAdicionarProduto.close();
    });



    //exibir produtos
    async function getProdutos() {
        const params = {
            page: 0,
            size: 30
        };

        const url = 'https://pinhomultimidias.azurewebsites.net/produto';

        try {
            const response = await axios.get(url, { params });
            const produtos = response.data;
            console.log(produtos);
            produtos.forEach(produto => {
                container.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img class="card-img-top" src="${produto.imagemPrincipal}" alt="Imagem do Produto" style="width: 200px; height: 200px;">
                            <div class="card-body">
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text">Preço: R$${produto.preco}</p>
                                <p class="card-text">Ano Início: ${produto.anoInicio}</p>
                                <p class="card-text">Ano Fim: ${produto.anoFim}</p> 

                                <button class="btn btn-primary btn-block btn-alterar" 
                                    data-produto-id="${produto.codigoProduto}" produto-nome="${produto.nome}" 
                                    tipo-produto="${produto.tipoProduto}" ano-inicio="${produto.anoInicio}" 
                                    ano-fim="${produto.anoFim}" produto-descricao="${produto.descricao}" 
                                    possuiRadio="${produto.possuiRadioOriginal}" comandoVolante ="${produto.possuiComandoVolante}" 
                                    preco-produto="${produto.preco}" video-produto="${produto.videoRelacionado}"
                                    imagem-principal="${produto.imagemPrincipal}" imagem-dois="${produto.imagem}"
                                    imagem-tres="${produto.imagem2}"  imagem-quatro="${produto.imagem3}">Editar
                                </button>
                                
                                <button class="btn btn-danger btn-block btn-excluir" data-produto-id="${produto.codigoProduto}">Excluir</button>
                            </div>
                        </div>                                                                                                      
                    </div>`;
            });

            // Listener para botão de alterar
            document.querySelectorAll('.btn-alterar').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    produtoIdAtual = this.getAttribute('data-produto-id');
                    const nome = this.getAttribute('produto-nome');
                    const tipoProduto = this.getAttribute('tipo-produto');
                    const anoInicio = this.getAttribute('ano-inicio');
                    const anoFim = this.getAttribute('ano-fim');
                    const descricao = this.getAttribute('produto-descricao');
                    const possuiRadioOriginal = this.getAttribute('possuiRadio') === 'true';
                    const possuiComandoVolante = this.getAttribute('comandoVolante') === 'true';
                    const preco = this.getAttribute('preco-produto');
                    const videoRelacionado = this.getAttribute('video-produto');
                    const imagemPrincipal = this.getAttribute('imagem-principal');
                    const img2 = this.getAttribute('imagem-dois');
                    const img3 = this.getAttribute('imagem-tres');
                    const img4 = this.getAttribute('imagem-quatro');

                    modalAlterar.showModal();

                    document.getElementById('nome').value = nome;
                    document.getElementById('tipoProduto').value = tipoProduto;
                    document.getElementById('preco').value = preco;
                    document.getElementById('anoInicio').value = anoInicio;
                    document.getElementById('anoFim').value = anoFim;
                    document.getElementById('descricao').value = descricao;
                    document.getElementById('videoRelacionado').value = videoRelacionado;
                    document.getElementById('imagemProduto1').value = imagemPrincipal;
                    document.getElementById('imagemProduto2').value = img2;
                    document.getElementById('imagemProduto3').value = img3;
                    document.getElementById('imagemProduto4').value = img4;

                    let divCheckboxes = document.getElementById('checkboxesMultimidia');
                    if (tipoProduto === 'MULTIMIDIA') {
                        divCheckboxes.style.display = 'block';
                    } else {
                        divCheckboxes.style.display = 'none';
                    }
                    document.getElementById('checkbox1').checked = possuiComandoVolante;
                    document.getElementById('checkbox2').checked = possuiRadioOriginal;
                });
            });

            // Listener para concluir edição
            concluirEdicao.addEventListener('click', function () {
                if (!produtoIdAtual) return;  // Verifica se há um produto a ser editado

                const nome = document.getElementById('nome').value;
                const tipoProduto = document.getElementById('tipoProduto').value;
                const preco = document.getElementById('preco').value;
                const anoInicio = document.getElementById('anoInicio').value;
                const anoFim = document.getElementById('anoFim').value;
                const descricao = document.getElementById('descricao').value;
                const videoRelacionado = document.getElementById('videoRelacionado').value;
                const possuiComandoVolante = document.getElementById('checkbox1').checked;
                const possuiRadioOriginal = document.getElementById('checkbox2').checked;
                const imagemPrincipal = document.getElementById('imagemProduto1').value;
                const imagem = document.getElementById('imagemProduto2').value;
                const imagem2 = document.getElementById('imagemProduto3').value;
                const imagem3 = document.getElementById('imagemProduto4').value;

                const dadosAtualizados = {
                    nome: nome,
                    tipoProduto: tipoProduto,
                    preco: preco,
                    anoInicio: anoInicio,
                    anoFim: anoFim,
                    descricao: descricao,
                    videoRelacionado: videoRelacionado,
                    possuiComandoVolante: possuiComandoVolante,
                    possuiRadioOriginal: possuiRadioOriginal,
                    imagemPrincipal: imagemPrincipal,
                    imagem: imagem,
                    imagem2: imagem2,
                    imagem3: imagem3
                };

                axios.put(`https://pinhomultimidias.azurewebsites.net/produto/${produtoIdAtual}`, dadosAtualizados)
                    .then(response => {
                        alert("Produto atualizado com sucesso!");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar o produto:', error);
                    });
            });

            // Listener para botão de excluir
            document.querySelectorAll('.btn-excluir').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    produtoIdAtual = this.getAttribute('data-produto-id');
                    modalExcluir.showModal();
                });
            });

            // Listener para concluir exclusão
            concluirExclusao.addEventListener('click', function () {
                if (!produtoIdAtual) return;  // Verifica se há um produto a ser excluído

                axios.delete(`https://pinhomultimidias.azurewebsites.net/produto/delete/${produtoIdAtual}`)
                    .then(response => {
                        alert("Produto excluído com sucesso!");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Erro ao excluir o produto:', error);
                    });
            });


            const fecharModal = document.getElementById('fechar-modal-alterar');
            fecharModal.addEventListener("click", function () {
                modalAlterar.close();
            });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    }

    getProdutos();

    const fecharModalExcluir = document.getElementById('fechar-modal-excluir');
    fecharModalExcluir.addEventListener("click", function () {
        modalExcluir.close();
    });
});
