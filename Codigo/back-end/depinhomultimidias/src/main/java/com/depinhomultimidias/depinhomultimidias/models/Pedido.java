package com.depinhomultimidias.depinhomultimidias.models;

import java.time.Instant;
import java.util.ArrayList;


import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


import com.depinhomultimidias.depinhomultimidias.enums.StatusPedido;

@Data
@NoArgsConstructor  
@AllArgsConstructor
@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Nonnull
    private Long id;

    @Column(name = "momento", nullable = false)
    @Nonnull
    private Instant momento = Instant.now();

    @Column(name = "status", nullable = false)
    private int status = StatusPedido.AGUARDANDO_PAGAMENTO.getValue();

    @OneToMany(mappedBy = "pedido")
    private List<ItemPedido> itens = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido")
    private List<Pagamento> pagamentos = new ArrayList<>();



    
}
