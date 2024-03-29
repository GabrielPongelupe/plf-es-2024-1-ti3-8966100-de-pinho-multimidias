package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.repositories.ProdutoRepository;

import lombok.NonNull;

@Service
public class ProdutoService {
    
    @Autowired
    public ProdutoRepository produtoRepository;

     public Produto findById(@NonNull Long id){
        Optional<Produto> produto = this.produtoRepository.findById(id);
        return produto.orElseThrow(() -> new RuntimeException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName()));

    
}
    
}
