// Variáveis do login
var formLogin = document.getElementById("forms-login");
var btnLogin = document.getElementById("btn-login");
var emailLogin = document.getElementById("email-login");
var senhaLogin = document.getElementById("password-login");
var usuarioErrado = document.getElementById("usuario-errado");


// verificar se tem pedido
var pedido = JSON.parse(localStorage.getItem('pedido')) || [];

// Endpoint
var urlLogin = "https://pinhomultimidias.azurewebsites.net/usuario/login";

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
    if(pedido.length > 0) {
      window.location.href = "insercaoDadosCompra.html";
    } else 
    window.location.href = "index.html";
    console.log('Login realizado com sucesso', response.data);
    console.log('Token:', response.data.token);


    
  })
  .catch(error => {
    if (error.response) {
      console.log("Data:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
      usuarioErrado.innerHTML = error.response.data.message;

    } else if (error.request) {
      console.log("Request:", error.request);

    } else {
      console.log("Error:", error.message);
      usuarioErrado.innerHTML = error.message;
    }
    console.log("Config:", error.config);
  })
  
})

