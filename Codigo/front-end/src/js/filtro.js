// varíaveis do filtro
var formFiltro = document.getElementById("filtroCarros");
var btnPesquisar = document.getElementById("botao-pesquisar-filtro");
var marcaCarro = document.getElementById("marca-carro-filtro");
var modeloCarro = document.getElementById('modelo-carro-filtro');
var anoCarro = document.getElementById('ano-carro-filtro');



// endpoint
var urledicaoFiltrocarros = "http://localhost:8080/produto/filtro";

async function getProdutosFiltrados(){
    try {
        
        const marca = marcaCarro.value;
        const modelo = modeloCarro.value;
        const ano = anoCarro.value;
        /*const marca = "Fiat";
        const modelo = "Toro";
        const ano = "2024";*/
        const response=await axios.get(urledicaoFiltrocarros,{
            params:{
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