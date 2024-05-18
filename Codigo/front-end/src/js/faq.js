const buttonCadastrar = document.getElementById("btn-cadastrar")

const modalCadastrar = document.getElementById("modal-cadastrar")
const modalEditar = document.getElementById("modal-editar")

const modalExcluir = document.getElementById("modal-excluir");
const concluirExclusao = document.getElementById('concluir-exclusao');

const buttonClose = document.querySelectorAll(".close")
const buttonDelete = document.querySelectorAll(".lixeira")
const buttonEdit = document.querySelectorAll(".btn-edit")

buttonCadastrar.onclick = function () {
    modalCadastrar.showModal()
}

buttonEdit.onclick = function () {
    modalEditar.showModal()
}

buttonDelete.onclick = function () {
    modalExcluir.showModal()
}

buttonClose.forEach(button => {
    button.addEventListener("click", () => {
        // Sua lógica aqui, por exemplo, fechar um modal, esconder um elemento, etc.
        modalCadastrar.close();
        modalEditar.close();
        modalExcluir.close();
    });
});

buttonEdit.forEach(button => {
    button.addEventListener("click", () => {
        modalEditar.showModal();
    });
});

buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
        modalExcluir.showModal();
    });
});

