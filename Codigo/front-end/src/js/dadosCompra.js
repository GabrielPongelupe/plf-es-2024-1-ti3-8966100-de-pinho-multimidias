document.addEventListener('DOMContentLoaded', function() {
   
   
   
    var formulario = document.getElementById("form-dados-compra");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        var primeiroNome = document.getElementById('primeiroNome').value;
        var ultimoNome = document.getElementById('ultimoNome').value;
        var email = document.getElementById('email').value;
        var rua = document.getElementById('rua').value;
        var bairro = document.getElementById('bairro').value;
        var numero = document.getElementById('numero').value;
        var complemento = document.getElementById('complemento').value || null;
        var estado = document.getElementById('estado').value;
        var cidade = document.getElementById('cidade').value;
        var cep = document.getElementById('cep').value;
        var telefone = document.getElementById('telefone').value;

        var urlCadastroDadosCompra = "http://127.0.0.1:8080/dados-pedido";

        var token = localStorage.getItem("token");

        async function cadastrarDadosCompra() {
            console.log(primeiroNome, ultimoNome, email, rua, estado, cidade, cep, telefone);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify({
            "primeiroNome": primeiroNome,
            "ultimoNome": ultimoNome,
            "email": email,
            "rua": rua,
            "bairro": bairro,
            "numero": numero,
            "complemento": complemento,
            "estado": estado,
            "cidade": cidade,
            "cep": cep,
            "telefone": telefone,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                const response = await fetch(urlCadastroDadosCompra, requestOptions);
                const result = await response.text();
                console.log(result);
                alert("Cadastro realizado com sucesso");
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }

        cadastrarDadosCompra();
    });
});