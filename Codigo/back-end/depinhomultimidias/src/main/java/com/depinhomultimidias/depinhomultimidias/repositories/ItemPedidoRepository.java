package com.depinhomultimidias.depinhomultimidias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido,Long> {
    
}
