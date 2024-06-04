package com.depinhomultimidias.depinhomultimidias.models;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


import com.depinhomultimidias.depinhomultimidias.enums.StatusPedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@NoArgsConstructor  
@AllArgsConstructor
@Entity
@JsonIgnoreProperties(value = { "usuario" }, allowSetters = true)
@Table(name = "pedido")
public class Pedido {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "momento", nullable = false)
    @NotNull
    private LocalDateTime momento = LocalDateTime.now();

    @Column(name = "status", nullable = false)
    private int status = StatusPedido.AGUARDANDO_PAGAMENTO.getValue();

    


    @OneToMany(mappedBy = "pedido")
    private List<ItemPedido> itens = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido")
    @JsonIgnore
    private List<Pagamento> pagamentos = new ArrayList<>();
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dados_pedido_id")
    private DadosPedido dadosPedido;





    
}
