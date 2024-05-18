//constantes e botoes modal
document.addEventListener('DOMContentLoaded', function () {
const modalCadastrar = document.getElementById("modal-cadastrar")
const modalEditar = document.getElementById("modal-editar")
const modalExcluir = document.getElementById("modal-excluir");
const buttonCadastrar = document.getElementById("btn-cadastrar")
// const buttonEdit = document.querySelectorAll(".btn-edit")
const buttonDelete = document.querySelectorAll(".lixeira")
const buttonClose = document.querySelectorAll(".close")
const buttonCadastro = document.getElementById("concluir-cadastro");
const buttonEdicao = document.getElementById('concluir-edicao');
const buttonExclusao = document.getElementById('concluir-exclusao');

const addPergunta = document.getElementById('add-pergunta');

//constantes crud perguntas frequentes
const perguntaCadastro = document.getElementById('pergunta-cadastrar');
const respostaCadastro = document.getElementById('resposta-cadastrar');

//endpoint
const urlCadastro = "http://127.0.0.1:8080/duvida";
//token
const token = localStorage.getItem("token");


// funcao para cadastrar produto
// Função para cadastrar pergunta
async function cadastrarPergunta() {
    console.log(perguntaCadastro.value, respostaCadastro.value);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const raw = JSON.stringify({
        "pergunta": perguntaCadastro.value,
        "resposta": respostaCadastro.value
    });


    console.log(raw,"raw")
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    
    try {
        const response = await fetch(urlCadastro, requestOptions);
        
        if (response.ok) {
            alert("Cadastro realizado com sucesso");
            window.location.reload();
        } else {
            alert(`Erro ao cadastrar: ${result.message}`);
        }
    } catch (error) {
        console.error(error);
    }
}


buttonCadastro.addEventListener("click", function (e) {
    e.preventDefault();
    cadastrarPergunta();
    alert("Cadastro realizado com sucesso");
    window.location.reload();

});



//MOSTRAR TODOS, EDICAO E EXCLUSAO DE PERGUNTAS
//botao de editar esta levando para o tem certeza que quer excluir

//const urlExclusao = 'http://127.0.0.1:8080/duvida/delete/';

async function getPerguntas() {

    //precisa da rota de get de todos as perguntas
    const url = 'http://127.0.0.1:8080/duvida/2';

    try {
        const response = await axios.get(url);
        const perguntas = response.data;

        // perguntas.forEach(pergunta => {
            addPergunta.innerHTML += `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center question mb-3">
          <span>${perguntas.pergunta}</span>
          <div class="button-group">
            <button class="btn btn-icon btn-edit me-2" data-pergunta="${perguntas.pergunta}" data-resposta="${perguntas.resposta}" data-pergunta-id="${perguntas.id}">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn btn-icon btn-delete lixeira" data-pergunta-id="${perguntas.id}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
               `;
        // }
    // );

        document.querySelectorAll('.btn-edit').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const pergunta = this.getAttribute('data-pergunta');
                const resposta = this.getAttribute('data-resposta');

                console.log( resposta, pergunta, "resposta", "pergunta")

                modalEditar.showModal();
        
                document.getElementById('pergunta-editar').value = pergunta;
                document.getElementById('resposta-editar').value = resposta;
            });
        });

        buttonEdicao.addEventListener('click', function () {
            const perguntaId = document.querySelector('.btn-edit').getAttribute('data-pergunta-id');
            const pergunta = document.getElementById('pergunta-editar').value;
            const resposta = document.getElementById('pergunta-editar').value;

            const dadosAtualizados = {
                pergunta: pergunta,
                resposta: resposta
            };

            axios.put(`http://127.0.0.1:8080/duvida/${perguntaId}`, dadosAtualizados)
                .then(response => {
                    console.log(response.data);
                    alert("Pergunta atualizada com sucesso!");
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erro ao atualizar o pergunta:', error);
                });
        });

        document.querySelectorAll('.btn-delete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const perguntaId = this.getAttribute('data-pergunta-id');
                
                modalExcluir.showModal();

                buttonExclusao.addEventListener('click', function () {
                    axios.delete(`http://127.0.0.1:8080/duvida/delete/${perguntaId}`)
                        .then(response => {
                            console.log(response.data);
                            alert("Pergunta excluída com sucesso!");
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error('Erro ao excluir o pergunta:', error);
                        });
                });
            });
        });

    } catch (error) {
        console.error('Erro ao obter produtos:', error);
    }
}

getPerguntas();



buttonCadastrar.onclick = function () {
    modalCadastrar.showModal()
}

// buttonEdit.forEach(button => {
//     button.addEventListener("click",() => {
//         modalEditar.showModal();
//     })
// })

buttonClose.forEach(button => {
    button.addEventListener("click", () => {
        modalCadastrar.close();
        modalEditar.close();
        modalExcluir.close();
    });
});

buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
        modalExcluir.showModal();
    });
});

});
