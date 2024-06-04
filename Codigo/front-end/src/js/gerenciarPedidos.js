document.addEventListener('DOMContentLoaded', () => {
    const editStatusBtn = document.getElementById('edit-status-btn');
    const editRastreioBtn1 = document.getElementById('edit-rastreio-btn-1');
    const editRastreioBtn2 = document.getElementById('edit-rastreio-btn-2');
    const modalEditarStatus = document.getElementById('modal-editar-status');
    const modalEditarRastreio = document.getElementById('modal-editar-codigo-rastreio');
    const closeStatusBtn = modalEditarStatus.querySelector('.close-editar-status');
    const closeRastreioBtn = modalEditarRastreio.querySelector('.close-editar-rastreio');
    const concluirEdicaoBtns = document.querySelectorAll('#concluir-edicao');
  
    // Função para abrir modal de editar status
    function openStatusModal() {
      modalEditarStatus.showModal();
    }
  
    // Função para fechar modal de editar status
    function closeStatusModal() {
      modalEditarStatus.close();
    }
  
    // Função para abrir modal de editar código de rastreio
    function openRastreioModal() {
      modalEditarRastreio.showModal();
    }
  
    // Função para fechar modal de editar código de rastreio
    function closeRastreioModal() {
      modalEditarRastreio.close();
    }
  
    // Event listeners para abrir modais
    editStatusBtn.addEventListener('click', openStatusModal);
    editRastreioBtn1.addEventListener('click', openRastreioModal);
    editRastreioBtn2.addEventListener('click', openRastreioModal);
  
    // Event listeners para fechar modais
    closeStatusBtn.addEventListener('click', closeStatusModal);
    closeRastreioBtn.addEventListener('click', closeRastreioModal);
  
    // Event listeners para botões de salvar (fechar modal)
    concluirEdicaoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeStatusModal();
        closeRastreioModal();
      });
    });
  });
  