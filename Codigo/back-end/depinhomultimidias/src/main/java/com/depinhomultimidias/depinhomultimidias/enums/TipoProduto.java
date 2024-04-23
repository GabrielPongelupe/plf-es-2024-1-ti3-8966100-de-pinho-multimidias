package com.depinhomultimidias.depinhomultimidias.enums;

import lombok.val;

public enum TipoProduto {
    CHICOTE("chicote"),
    MULTIMIDIA("multimidia"),
    MOLDURA("moldura");

    private String value;

    TipoProduto(String value){
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
}
