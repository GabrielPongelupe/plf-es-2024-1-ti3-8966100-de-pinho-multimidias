package com.depinhomultimidias.depinhomultimidias.models;

import com.depinhomultimidias.depinhomultimidias.enums.TipoPagamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dados_pedido")
public class DadosPedido {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primeiro_nome", nullable = false)
    private String primeiroNome;

    @Column(name = "ultimo_nome", nullable = false)
    private String ultimoNome;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "estado", nullable = false)
    private String estado;

    @Column(name = "cidade", nullable = false)
    private String cidade;

    @Column(name = "bairro", nullable = false)
    private String bairro;

    @Column(name = "rua", nullable = false)
    private String rua;

    @Column(name = "numero", nullable = false)
    private String numero;

    @Column(name = "complemento", nullable = true)
    private String complemento;

    @Column(name = "cep", nullable = false)
    private String cep;

    @Column(name = "telefone", nullable = false)
    private String telefone;

    @Column(name = "forma_pagamento", nullable = true)
    private TipoPagamento formaPagamento = TipoPagamento.PIX;

    @OneToOne(mappedBy = "dadosPedido")
    private Pedido pedido;

}
