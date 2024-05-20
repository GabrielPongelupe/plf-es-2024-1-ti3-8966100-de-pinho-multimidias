package com.depinhomultimidias.depinhomultimidias.enums;

public enum TipoPagamento {
    

    DINHEIRO("dinheiro"),
    CARTAODEBITO("cartaoDebito"),
    CARTAOCREDITO("cartaoCredito"),
    PIX("pix");

    private String formaPagamento;

    TipoPagamento(String formaPagamento){
        this.formaPagamento = formaPagamento;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }
}
