// escopo global

function logout(){
    localStorage.clear();
    alert("Deslogado com sucesso");
    window.location.href = "index.html";
}


// Classe Header
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.renderHeader();
    }

    async renderHeader() {
        let userType = 'default';
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.get("http://127.0.0.1:8080/usuario/tipoUser", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    userType = 'admin';
                } else if (response.status === 403) {
                    userType = 'client';
                }
            } catch (error) {
                userType = 'client';
            }
        }

        switch (userType) {
            case 'admin':
                this.renderAdminHeader();
                break;
            case 'client':
                this.renderClientHeader();
                break;
            default:
                this.renderDefaultHeader();
                break;
        }
    }

    renderDefaultHeader() {
        this.innerHTML = `
    <header>
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container">
        <div class="row gy-3">
          <div class="col-lg-2 col-sm-4 col-4">
            <a href="index.html" class="float-start">
              <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
            </a>
          </div>
          <div class="order-lg-last col-lg-5 col-sm-8 col-8">
            <div class="d-flex float-end">
              <a href="login.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                <i class="fas fa-user-alt m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Fazer Login</p>
              </a>
              <a href="carrinho.html" class="border rounded py-1 px-3 nav-link d-flex align-items-center">
                <i class="fas fa-shopping-cart m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Carrinho</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>`;
    }

    renderAdminHeader() {
        this.innerHTML = `
    <header>
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container">
        <div class="row gy-3">
          <div class="col-lg-2 col-sm-4 col-4">
            <a href="index.html" class="float-start">
              <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
            </a>
          </div>
          <div class="order-lg-last col-lg-5 col-sm-8 col-8">
            <div class="d-flex float-end">
              <a href="vizualizadorProdutos.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                Gerenciar Produtos</p>
              </a>
              <a href="cadastroProduto.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                Adicionar Produto</p>
              </a>
              <a href="faq.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                Gerenciar FAQ</p>
              </a>
              <button class="border rounded py-1 px-3 nav-link d-flex align-items-center" id="logout-button" onclick="logout()">Sair</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </header>`;
    }

    renderClientHeader() {
        this.innerHTML = `
        <header>
        <div class="p-3 text-center bg-white border-bottom">
          <div class="container">
            <div class="row gy-3">
              <div class="col-lg-2 col-sm-4 col-4">
                <a href="index.html" class="float-start">
                  <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
                </a>
              </div>
              <div class="order-lg-last col-lg-5 col-sm-8 col-8">
                <div class="d-flex float-end">
                  <a href="edicaoPefil.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                    Perfil</p>
                  </a>
                  <a href="carrinho.html" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                  Carrinho</p>
                </a>
                  <button class="border rounded py-1 px-3 nav-link d-flex align-items-center" onclick="logout()">
                    <p class="d-none d-md-block mb-0">Sair</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
        `
    }



}

document.addEventListener("DOMContentLoaded", function () {
    customElements.define('header-component', Header);
    const headerComponent = document.querySelector('header-component');
    headerComponent.renderHeader();
});

