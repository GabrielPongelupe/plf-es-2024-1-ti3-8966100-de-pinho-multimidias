// Variáveis do login
var formLogin = document.getElementById("forms-login");
var btnLogin = document.getElementById("btn-login");
var emailLogin = document.getElementById("email-login");
var senhaLogin = document.getElementById("password-login");

// limpar local storage
localStorage.clear();

// Endpoint
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

