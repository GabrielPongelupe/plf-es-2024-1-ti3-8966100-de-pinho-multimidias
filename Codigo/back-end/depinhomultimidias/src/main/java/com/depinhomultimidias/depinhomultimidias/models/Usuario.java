package com.depinhomultimidias.depinhomultimidias.models;

import java.sql.Blob;
import java.util.ArrayList;

import java.util.List;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Nonnull
    private Long id;

    @Column(name = "email",unique = true, nullable = false)
    @Nonnull
    private String email;

    @Column(name = "senha",nullable = false)
    @Nonnull
    private String senha;

    @Column(name = "primeiro_nome", nullable = true)
    private String primeiroNome;

    @Column(name = "ultimo_nome",nullable = true)
    private String ultimoNome;

    @Column(name = "contato",nullable = true)
    private String contato;

    @Column(name = "fote_perfil",nullable = true)
    private Blob fotoPerfil;

    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidos = new ArrayList<>();



    
}
