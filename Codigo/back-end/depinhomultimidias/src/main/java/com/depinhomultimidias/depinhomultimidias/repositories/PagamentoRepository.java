package com.depinhomultimidias.depinhomultimidias.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.depinhomultimidias.depinhomultimidias.models.Pagamento;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento,Long> {
    
}
