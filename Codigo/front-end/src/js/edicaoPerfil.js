// varíaveis da edicaoPerfil
var formPerfil = document.getElementById("forms-perfil");
var btnSalvar = document.getElementById("btn-salvar");
var emailPerfil = document.getElementById("email-perfil");
var ultimoNome = document.getElementById('ultimo-nome-perfil');
var primeiroNome = document.getElementById('primeiro-nome-perfil');
var contato = document.getElementById('contato-perfil');

// endpoint
const userId = localStorage.getItem('userId');
var token = localStorage.getItem("token");
var urledicaoPerfil  = `https://pinhomultimidias.azurewebsites.net/usuario/${userId}`;





async function editarPerfil() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
        "email": emailPerfil.value,
        "primeiroNome": primeiroNome.value,
        "ultimoNome": ultimoNome.value,
        "contato": contato.value
    });

    console.log(raw,"raw")

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };


    try {
        const response = await fetch(urledicaoPerfil, requestOptions);
        const result = await response.text();
        console.log(response)
        console.log(result);
        alert("Perfil atualizado com sucesso");
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}



btnSalvar.addEventListener("click", async function (e) {
    e.preventDefault();

/*

    var data = {
        email: emailPerfil.value,
        primeiroNome: primeiroNome.value,
        ultimoNome: ultimoNome.value,
        contato: contato.value
    }

    console.log(data);

    axios.put(urledicaoPerfil, data)
        .then(response => {
            console.log('Edição de perfil realizada com sucesso', response.data);
        })
        .catch(error => {
            if (error.response) {
                console.log("Data:", error.response.data);
                console.log("Status:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                console.log("Request:", error.request);
            } else {
                console.log("Error:", error.message);
            }
            console.log("Config:", error.config);
      
            })
*/
await editarPerfil();
})