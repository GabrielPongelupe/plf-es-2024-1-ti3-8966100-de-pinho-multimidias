
![dePinhoLP](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti3-8966100-de-pinho-multimidias/assets/119077937/657b04df-43b5-4973-8d3c-63e1c01cd9dd)

# DePinho Multimídias

DePinho multimídias é um site para facilitar a compra de novas multimídias para os clientes do YouTuber Gabriel De Pinho. O site apresentará a opção de filtragem dos produtos por meio do carro do cliente, mostrando apenas os modelos de multimídia compatíveis com o modelo do veículo.

# Acesso ao teste online do site
Para acessar a versão de teste do site você pode seguir o seguinte link: https://plf-es-2024-1-ti3-8966100-de-pinho-multimidias.vercel.app/
Para testar o pagamento na API do mercado pago utilizar cartões ficticios de teste disponibilidados por eles em: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/test-cards
Login de administrador para testes:
login: 1@1.com
senha: 1234


## Alunos integrantes da equipe

* Arthur Ferreira Costa
* Gabriel Ferreira Amaral
* Gabriel Pongelupe de Carvalho
* Pedro Henrique Braga de Castro
* Renato Cazzoletti

## Professores responsáveis

* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho

## Instruções de utilização

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Apache Maven](https://maven.apache.org/)
- [MySQL](https://www.mysql.com/)

### Passo a passo para instalação e execução

#### 1. Clonar o repositório

```bash
git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti3-8966100-de-pinho-multimidias.git
cd plf-es-2024-1-ti3-8966100-de-pinho-multimidias
```

#### 2. Configurar o banco de dados

- Configure as credenciais do seus banco de dados no arquivo `application.properties` localizado em `src/main/resources`:
  ```properties
  spring.datasource.username=seu-usuario
  spring.datasource.password=sua-senha
  ```

#### 3. Atualizar a configuração do CORS

No arquivo de configuração de CORS, atualize a configuração para permitir o frontend rodando no localhost:8081:

```java
    .allowedOrigins("http://127.0.0.1:8081")
```

#### 4. Instalar dependências

No diretório raiz do projeto, execute:

```bash
mvn clean install
```

#### 5. Executar a aplicação

Ainda no diretório raiz, execute:

```bash
mvn spring-boot:run
```

A aplicação estará rodando em [http://localhost:8080](http://localhost:8080).

### Utilização

1. **Registro e Login:**
   - Registre-se como um novo usuário ou faça login com suas credenciais existentes.

2. **Navegação de Produtos:**
   - Utilize o filtro para selecionar o modelo do seu veículo e veja os produtos compatíveis.

3. **Adicionar ao Carrinho:**
   - Adicione os produtos desejados ao carrinho de compras.

4. **Finalizar Compra:**
   - Complete as informações necessárias para o pagamento e finalize a compra.

### Login como Administrador

Para fazer login como administrador, você deve fazer a requisição através do Postman:

1. **Abra o Postman e crie uma nova requisição POST.**
2. **URL:** `http://localhost:8080/usuario/register`
3. **Body:** Selecione a opção `raw` e escolha o formato `JSON`. Insira as credenciais de administrador no seguinte formato:
    ```json
        {
        
        "email": "teste@123412",
        
        "senha": "luisa1234",
        
        "primeiroNome": "Gabriel",
        
        "ultimoNome": "Enzo",
        
        "contato": "(37) 12345-6789",
        
        "role": "ADMINISTRADOR"
        
        }
    ```
4. **Envie a requisição.** Ao fazer login com esse usuário, no LocalStorage do seu navegador haverá um token de autenticação que deverá ser usado nas requisições subsequentes para acessar funcionalidades administrativas.
