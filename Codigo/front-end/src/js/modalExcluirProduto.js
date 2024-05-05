//variaveis
const modalExcluir = document.getElementById('modal-excluir')
const btnAbrirModal = document.getElementById('btn-excluir');
const btnFecharModal = document.getElementById('fechar-modal-excluir');


// funcoes
btnAbrirModal.addEventListener('click', () => {
    modalExcluir.showModal();
});
btnFecharModal.addEventListener('click', () => {
    modalExcluir.close();
});