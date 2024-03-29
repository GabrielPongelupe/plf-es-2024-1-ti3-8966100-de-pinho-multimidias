package com.depinhomultimidias.depinhomultimidias.enums;


public enum TipoUsuario {

    
    ADMINISTRADOR(0),
    CLIENTE(1);



    private int value;

    TipoUsuario(int value){
        this.value = value;
     }

     public int getValue() {
         return value;
     }
}
 
    