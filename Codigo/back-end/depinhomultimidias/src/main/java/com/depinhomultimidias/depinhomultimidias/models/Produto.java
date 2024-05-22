package com.depinhomultimidias.depinhomultimidias.models;

import java.util.ArrayList;
import java.util.List;

import com.depinhomultimidias.depinhomultimidias.enums.TipoProduto;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "produto")
public class Produto {

    @Id
    @Column(name = "codigo_produto", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigoProduto;

    
    @Column(name = "nome", nullable = false)
    @NotBlank(message = "O Campo é obrigatório")
    private String nome;

    @Column(name = "preco", nullable = false)
    @NotBlank(message = "O Campo é obrigatório")
    private Double preco;

    @Column(name = "descricao", nullable = false)
    @NotBlank(message = "O Campo é obrigatório")
    private String descricao;

    @OneToMany(mappedBy = "produto")
    private List<ItemPedido> itens = new ArrayList<>();

   @Column(name = "ano_inicio", nullable = true)
   private Integer anoInicio;

   @Column(name = "ano_fim", nullable = true)
   private Integer anoFim;

   @Column(name = "video_relacionado", nullable = true)
   private String videoRelacionado;

   @Column(name = "tipo_produto", nullable = true)
   private TipoProduto tipoProduto;

   @Column(name = "possuiComandoVolante", nullable = true)
   private boolean possuiComandoVolante;

   @Column(name = "possuiRadioOriginal", nullable = true)
   private boolean possuiRadioOriginal;
    
   @Column(name = "imagem_Principal", nullable = true)
   private String  imagemPrincipal;

   @Column(name = "imagem",nullable = true)
   private String imagem;

   @Column(name = "imagem2",nullable = true)
   private String imagem2;
    
   @Column(name = "imagem3",nullable = true)
   private String imagem3;


}
