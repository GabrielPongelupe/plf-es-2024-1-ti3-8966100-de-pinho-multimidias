package com.depinhomultimidias.depinhomultimidias.models;

import java.util.ArrayList;
import java.util.List;

import com.depinhomultimidias.depinhomultimidias.enums.TipoProduto;

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
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "produto")
public class Produto {

    @Id
    @Column(name = "codigo_produto", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Nonnull
    private Long codigoProduto;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco", nullable = false)
    private Double preco;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    
    @OneToMany(mappedBy = "produto")
    private List<ItemPedido> itens = new ArrayList<>();

   @Column(name = "ano_inicio", nullable = true)
   private int anoInicio;

   @Column(name = "ano_fim", nullable = true)
   private int anoFim;

   @Column(name = "video_relacionado", nullable = true)
   private String videoRelacionado;

   @Column(name = "tipo_produto", nullable = true)
   private TipoProduto tipoProduto;

   @Column(name = "possuiComandoVolante", nullable = true)
   private boolean possuiComandoVolante;

   @Column(name = "possuiRadioOriginal", nullable = true)
   private boolean possuiRadioOriginal;

}
