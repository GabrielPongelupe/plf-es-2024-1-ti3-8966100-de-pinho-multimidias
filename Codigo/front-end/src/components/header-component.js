// escopo global

function logout() {
  localStorage.clear();
  alert("Deslogado com sucesso");
  window.location.href = "index.html";
}

let qntdCarrinho = 0;
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


function atualizarQuantidadeCarrinho() {
  qntdCarrinho = 0;
  carrinho.forEach(item => {
    qntdCarrinho++;
  });
  document.getElementById('qntd-carrinho').textContent = qntdCarrinho;

}

// Classe Header
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderHeader();
  }

  renderHeader() {
    let userType = 'default';
    const token = localStorage.getItem('token');


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      "token": `${token}`
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/usuario/tipoUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        const { tipo, id } = result;
        localStorage.setItem('userId', id);

        if (tipo === 'ADMINISTRADOR') {
          userType = 'admin';
        } else if (tipo === 'CLIENTE') {
          userType = 'client';
        }

        this.updateHeader(userType);
      })
      .catch(error => {
        console.error(error);
        this.updateHeader(userType); 
      });
  
  }

updateHeader(userType) {
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
    <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Navbar brand -->
    <a class="navbar-brand mt-2 mt-lg-0" href="index.html">
      <img
        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
        height="50"
        alt="MDB Logo"
        loading="lazy"
      />
    </a>

    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarRightContent"
      aria-controls="navbarRightContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarRightContent">
      <!-- Right elements -->
      <div class="d-flex align-items-center ms-auto">
        <!-- Icon -->
        <a class="text-reset me-3 position-relative" href="carrinho.html">
          <i class="fas fa-shopping-cart m-1 me-md-2"></i>
          <span class="badge rounded-pill badge-notification bg-danger position-absolute top-0 start-100 translate-middle" id="qntd-carrinho"></span>
        </a>

        <!-- Avatar -->
        <div class="dropdown">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="login.html"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          <i class="fas fa-user-alt m-1 me-md-2"></i>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item" href="login.html">Entrar Agora</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Meus Pedidos</a>
            </li>
            <li>
              <a class="dropdown-item" href="cadastro.html">Criar Conta</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right elements -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Navbar -->`;
}

renderAdminHeader() {
  this.innerHTML = `
    <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Navbar brand -->
    <a class="navbar-brand mt-2 mt-lg-0" href="index.html">
      <img
        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
        height="50"
        alt="MDB Logo"
        loading="lazy"
      />
    </a>

    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarRightContent"
      aria-controls="navbarRightContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarRightContent">
      <!-- Right elements -->
      <div class="d-flex align-items-center ms-auto">
        <!-- Admin Links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="gerenciaProdutos.html">Gerenciar Produtos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="faq.html">Gerenciar FAQ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"  onclick="logout()">Sair</a>
          </li>
        </ul>
      </div>
      <!-- Right elements -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Navbar -->`;
}

renderClientHeader() {
  this.innerHTML = `
        <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Navbar brand -->
    <a class="navbar-brand mt-2 mt-lg-0" href="index.html">
      <img
        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
        height="50"
        alt="MDB Logo"
        loading="lazy"
      />
    </a>

    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarRightContent"
      aria-controls="navbarRightContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarRightContent">
      <!-- Right elements -->
      <div class="d-flex align-items-center ms-auto">
        <!-- Icon -->
        <a class="text-reset me-3 position-relative" href="carrinho.html">
          <i class="fas fa-shopping-cart m-1 me-md-2"></i>
          <span class="badge rounded-pill badge-notification bg-danger position-absolute top-0 start-100 translate-middle" id="qntd-carrinho"></span>
        </a>

        <!-- Avatar -->
        <div class="dropdown">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="login.html"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          <i class="fas fa-user-alt m-1 me-md-2"></i>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item" href="perfil.html">Meu Perfil</a>
            </li>
            <li>
              <a class="dropdown-item" href="index.html" onclick="logout()">Sair</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right elements -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Navbar -->
        `
}



}

document.addEventListener("DOMContentLoaded", function () {
  customElements.define('header-component', Header);
  const headerComponent = document.querySelector('header-component');
  headerComponent.renderHeader();
  //atualizarQuantidadeCarrinho();

});

