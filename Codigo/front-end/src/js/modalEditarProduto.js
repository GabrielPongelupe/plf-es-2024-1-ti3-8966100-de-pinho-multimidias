//variaveis
const modal = document.getElementById('modal-alterar')
const btnOpenModal = document.getElementById('btn-alterar');
const btnCloseModal = document.getElementById('fechar-modal-alterar');


// funcoes
btnOpenModal.addEventListener('click', () => {
    modal.showModal();
});
btnCloseModal.addEventListener('click', () => {
    modal.close();
});


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

// Chamar a função quando a página for carregada
window.onload = function() {
    verificarOpcaoSelecionada();
};

// Adicionar evento de mudança para verificar a opção selecionada
document.getElementById('tipoProduto').addEventListener('change', verificarOpcaoSelecionada);

// JavaScript para abrir o seletor de arquivos ao clicar no botão "+"
document.querySelectorAll('.btn-adicionar').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var inputId = this.getAttribute('for');
        document.getElementById(inputId).click();
    });
});