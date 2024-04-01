package com.depinhomultimidias.depinhomultimidias.enums;


public enum TipoUsuario {

    
    ADMINISTRADOR("ADMINISTRADOR"),
    CLIENTE("CLIENTE");



    private String value;

    TipoUsuario(String value){
        this.value = value;
     }

     public String getRole() {
         return value;
     }
}
 
    