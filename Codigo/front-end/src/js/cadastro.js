// varíaveis do cadastro
var formCadastro = document.getElementById("forms-cadastro");
var btnCadastro = document.getElementById("btn-cadastro");
var emailCadastro = document.getElementById("email-cadastro");
var senhaCadastro = document.getElementById("password-cadastro");
var ultimoNome = document.getElementById('ultimo_nome');
var primeiroNome = document.getElementById('primeiro_nome');
var contato = document.getElementById('contato');

// endpoint
var urlCadastro = "https://pinhomultimidias.azurewebsites.net/usuario/register";

// enviar dados do cadastro
btnCadastro.addEventListener("click", function (e) {
    e.preventDefault();

    var data = {
        email: emailCadastro.value,
        senha: senhaCadastro.value,
        primeiroNome: primeiroNome.value,
        ultimoNome: ultimoNome.value,
        contato: contato.value,
        role: "CLIENTE"
    }

    axios.post(urlCadastro, data)
        .then(response => {
            alert("Cadastro realizado com sucesso");
            window.location.href = "login.html";
            console.log('Cadastro realizado com sucesso', response.data);
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

})

/* Início de Teste de login pelo Google */

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}

window.handleCredentialResponse = (response) => {
    let = response;
    responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    $("#name").text(responsePayload.name)
    $("#email").text(responsePayload.email)
    $("#image").attr('src', responsePayload.picture)
    $(".data").css("display", "block")
    $(".g-signin2").css("display", "none")
    $(".container").css("display", "none")
}


function signOut() {
    google.accounts.id.revoke;;
    alert("Você foi deslogado")
    $(".g-signin2").css("display", "block")
    $(".container").css("display", "block")
    $(".data").css("display", "none")
};

/* Fim de Teste de login pelo Google */
