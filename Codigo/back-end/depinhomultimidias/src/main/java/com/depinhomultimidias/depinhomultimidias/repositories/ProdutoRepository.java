package com.depinhomultimidias.depinhomultimidias.repositories;


import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.stereotype.Repository;

import com.depinhomultimidias.depinhomultimidias.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Long>,JpaSpecificationExecutor<Produto> {
    @Query("SELECT p FROM Produto p WHERE p.codigoProduto = :codigoProduto")
    Optional<Produto> findBycodigoProduto(Long codigoProduto);

    void deleteBycodigoProduto(long codigoProduto);

}
