package com.depinhomultimidias.depinhomultimidias.enums;

public enum StatusPedido{
    AGUARDANDO_PAGAMENTO(0),
    PAGO(1),
    ENVIADO(2),
    CANCELADO(3);




    private int value;

    StatusPedido(int value){
        this.value = value;
     }

     public int getValue() {
         return value;
     }
    
}
