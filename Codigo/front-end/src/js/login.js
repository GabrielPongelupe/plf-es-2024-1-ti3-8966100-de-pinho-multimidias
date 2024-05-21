// variáveis do login
var formLogin = document.getElementById("forms-login");
var btnLogin = document.getElementById("btn-login");
var emailLogin = document.getElementById("email-login");
var senhaLogin = document.getElementById("password-login");

localStorage.clear();
localStorage.setItem("token", "teste");

// endpoint
var urlLogin = "http://127.0.0.1:8080/usuario/login";

btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    var data = {
        email: emailLogin.value,
        senha: senhaLogin.value
    }

    axios.post(urlLogin, data)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            alert("Login realizado com sucesso");
            window.location.href = "index.html";
            console.log('Login realizado com sucesso', response.data);
            console.log('Token:', response.data.token);
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

// function decodeJwtResponse(token) {
//     let base64Url = token.split('.')[1]
//     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload)
// }

// window.handleCredentialResponse = (response) => {
//     let = response;
//     responsePayload = decodeJwtResponse(response.credential);

//     console.log("ID: " + responsePayload.sub);
//     console.log('Full Name: ' + responsePayload.name);
//     console.log('Given Name: ' + responsePayload.given_name);
//     console.log('Family Name: ' + responsePayload.family_name);
//     console.log("Image URL: " + responsePayload.picture);
//     console.log("Email: " + responsePayload.email);

//     $("#name").text(responsePayload.name)
//     $("#email").text(responsePayload.email)
//     $("#image").attr('src', responsePayload.picture)
//     $(".data").css("display", "block")
//     $(".g-signin2").css("display", "none")
//     $(".container").css("display", "none")
// }


// function signOut() {
//     google.accounts.id.revoke;;
//     alert("Você foi deslogado")
//     $(".g-signin2").css("display", "block")
//     $(".container").css("display", "block")
//     $(".data").css("display", "none")
// };

// /* Fim de Teste de login pelo Google */

