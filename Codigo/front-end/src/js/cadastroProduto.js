document.addEventListener("DOMContentLoaded", function () {

    // variaveis do cadastro
    var botao = document.getElementById("btn-cadastrar-produto");

    // url 
    var urlCadastroProduto = "http://127.0.0.1:8080/produto";

    // token da localstorage
    var token = localStorage.getItem("token");

    // funcao para cadastrar produto
    async function cadastrarProduto() {
        var nome = document.getElementById("nomeProduto").value;
        var tipoProduto = document.getElementById("tipoProduto").value;
        var preco = parseFloat(document.getElementById("precoProduto").value);
        var comandoVolante = document.getElementById("checkbox1").checked;
        var radioOriginal = document.getElementById("checkbox2").checked;
        var anoInicio = parseInt(document.getElementById("anoInicio").value);
        var anoFinal = parseInt(document.getElementById("anoFinal").value);
        var videoRelacionado = document.getElementById("videoRelacionado").value;
        var descricao = document.getElementById("descricaoGrande").value;

        console.log(nome, tipoProduto, preco, comandoVolante, radioOriginal, anoInicio, anoFinal, videoRelacionado, descricao)

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
            "possuiRadioOriginal": radioOriginal
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(urlCadastroProduto, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }


    botao.addEventListener("click", function (e) {
        e.preventDefault();
        cadastrarProduto();
        alert("Cadastro realizado com sucesso");
        window.location.reload();

    });
})

