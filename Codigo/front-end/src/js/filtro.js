// varíaveis do filtro
var formFiltro = document.getElementById("filtroCarros");
var btnPesquisar = document.getElementById("botao-pesquisar-filtro");
var marcaCarro = document.getElementById("marca-carro-filtro");
var modeloCarro = document.getElementById('modelo-carro-filtro');
var anoCarro = document.getElementById('ano-carro-filtro');
var comandoVolante = document.getElementById('comando-volante');
var radioOriginal = document.getElementById('radio-original');


// Verifica o valor da checkbox

// endpoint
var urledicaoFiltrocarros = "http://127.0.0.1:8080/produto/filtro";

async function getProdutosFiltrados(){
    try {
        
        
        
        const marca = marcaCarro.value;
        const modelo = modeloCarro.value;
        const ano = anoCarro.value;
        
        const comando = comandoVolante.checked;
        const radio = radioOriginal.checked;
        console.log(radio)

        const response=await axios.get(urledicaoFiltrocarros,{
            params:{
                possuiComandoVolante:comando,
                radioOriginal:radio,
                marca:marca,
                modelo:modelo,
                ano:ano,
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("erro ao obter produtos filtrados");
    }
}


btnPesquisar.addEventListener("click", function (e) {
    e.preventDefault();

    getProdutosFiltrados();

   

})