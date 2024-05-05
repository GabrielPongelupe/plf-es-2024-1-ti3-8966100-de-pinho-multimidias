// variaveis do cadastro
var formulario = document.getElementById("forms-cadastro-produto");
var nome = document.getElementById("nomeProduto").value;
var tipoProduto = document.getElementById("tipoProduto").value;
var preco = parseFloat(document.getElementById("precoProduto").value);
var comandoVolante = document.getElementById("checkbox1").checked;
var radioOriginal = document.getElementById("checkbox2").checked;
var anoInicio = parseInt(document.getElementById("anoInicio").value);
var anoFinal = parseInt(document.getElementById("anoFinal").value);
var videoRelacionado = document.getElementById("videoRelacionado").value;
var botao = document.getElementById("btn-cadastrar-produto");
var descricao = document.getElementById("descricaoGrande").value;

// url 
var urlCadastroProduto = "http://127.0.0.1:8080/produto";

// token da localstorage
var token = localStorage.getItem("token");


// funcao para cadastrar produto
async function cadastrarProduto() {
    try {
        const response = await axios.post(urlCadastroProduto, {
            nome: nome,
            preco: preco,
            descricao: descricao,
            anoInicio: anoInicio,
            anoFim: anoFinal,
            videoRelacionado: videoRelacionado,
            tipoProduto: tipoProduto,
            possuiComandoVolante: comandoVolante,
            possuiRadioOriginal: radioOriginal
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("erro ao cadastrar produto");
    }
}