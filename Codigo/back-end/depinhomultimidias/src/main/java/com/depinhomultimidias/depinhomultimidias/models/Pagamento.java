package com.depinhomultimidias.depinhomultimidias.models;

import java.time.Instant;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "pagamento")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pagamento {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name = "momento", nullable = false)
    private Instant momento = Instant.now();

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
    
}
