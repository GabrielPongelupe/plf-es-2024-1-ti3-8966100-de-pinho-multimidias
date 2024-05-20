package com.depinhomultimidias.depinhomultimidias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.depinhomultimidias.depinhomultimidias.models.DadosPedido;

@Repository
public interface DadosPedidoRepository extends JpaRepository<DadosPedido,Long>{
    
}
