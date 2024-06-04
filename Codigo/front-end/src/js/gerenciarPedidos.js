document.addEventListener("DOMContentLoaded", () => {
  const editRastreioBtn = document.querySelectorAll(".edit-rastreio-btn");
  const modalEditarRastreio = document.getElementById("modal-editar-codigo-rastreio");
  const closeRastreioBtn = document.getElementById("btn-modal-close-rastreio");
  const concluirEdicaoBtns = document.querySelectorAll(".concluir-edicao");

  // Função para abrir modal de editar código de rastreio
  function openRastreioModal() {
    modalEditarRastreio.showModal();
  }

  // Função para fechar modal de editar código de rastreio
  function closeRastreioModal() {
    modalEditarRastreio.close();
  }

  // Event listeners para abrir modais
  editRastreioBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openRastreioModal();
    });
  });
  //editRastreioBtn.forEach.addEventListener('click', openRastreioModal);

  // Event listeners para fechar modais
  closeRastreioBtn.addEventListener("click", closeRastreioModal);

  // Event listeners para botões de salvar (fechar modal)
  concluirEdicaoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeRastreioModal();
    });
  });
});
