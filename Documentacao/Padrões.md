### Rotas:
http://127.0.0.1:8080
##### Item Pedidos:
+  /item-pedido/{id} (GET)
+  /item-pedido/{id} (PUT)
+  /item-pedido (CREATE)
##### Pagamento:
+  /pagamento/{id} (GET)
+  /pagamento/{id} (PUT)
+  /pagamento (CREATE)
##### Pedido:
+  /pedido/{id} (GET)
+  /pedido/{id} (PUT)
+  /pedido (CREATE)
##### Produto:
+  /produto/{id} (GET)
+  /produto/{id} (PUT)
+  /produto (CREATE)
+  /produto/filtro? (GET)
+  /produto/delete/{codigo} (DELETE)
    + exemplo : http://127.0.0.1:8080/produto/filtro?possuiComandoVolante=true&marca=Fiat
    + variáveis da query do filtro: possuiRadioOriginal, possuiComandoVolante, marca, ano, modelo
 
##### Usuario:
+  /usuario/{id} (GET)
+  /usuario/{id} (PUT)
+  /usuario (CREATE) // **DEPRECIADA** / **NÃO UTILIZAR**
+  /usuario/login (CREATE)
+  /usuario/register (CREATE) 


### Padrão JSON
exemplo sintático : {

  "email": "teste@123412",
  
  "senha": "luisa1234",
  
  "primeiroNome": "Gabriel",
  
  "ultimoNome": "Enzo",
  
  "contato": "(37) 12345-6789",
  
  "role": "ADMINISTRADOR"
  
}
#### Variáveis e seus tipos:
##### Item Pedido:
+ id : Long (default: @GeneratedValue(strategy = GenerationType.IDENTITY)) *Unique
+ pedido : Pedido
+ produto : Produto
+ quantidade : Integer
+ preco : Double

##### Pagamento:
+ id : Long (default: @GeneratedValue(strategy = GenerationType.IDENTITY)) *Unique
+ momento : Instant
+ pedido : Pedido

##### Pedido:
+ id : Long (default: @GeneratedValue(strategy = GenerationType.IDENTITY)) *Unique
+ momento : Instant (default: Instant.now()) 
+ status : int (default: StatusPedido.AGUARDANDO_PAGAMENTO.getValue())
+ itens : List#ItemPedido#
+ usuario : Usuario
+ pagamentos: List#Pagamento#

##### Produto:
+ id : Long (default: @GeneratedValue(strategy = GenerationType.IDENTITY)) *Unique
+ nome : String *NotNull
+ preco : Double *NotNull
+ descricao : String *NotNull
+ itens : List#ItemPedido#
+ anoInicio : Integer
+ anoFim : Integer
+ videoRelacionado : String
+ tipoProduto : TipoProduto
+ possuiComandoVolante : boolean
+ possuiRadioOriginal : boolean

##### Usuario: 
+ id : Long (default: @GeneratedValue(strategy = GenerationType.IDENTITY)) *Unique
+ email : String  *NotNull *Unique
+ senha : String  *NotNull
+ primeiroNome : String
+ ultimoNome : String
+ contato : String
+ fotoPerfil : BLOB
+ pedidos : List#Pedido#
+ tipoUsuario : TipoUsuario
