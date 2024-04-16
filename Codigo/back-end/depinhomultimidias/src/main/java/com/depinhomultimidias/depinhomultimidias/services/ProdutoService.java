package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.repositories.ProdutoRepository;
import com.depinhomultimidias.depinhomultimidias.specification.FilterCriteria;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class ProdutoService {

    @Autowired
    public ProdutoRepository produtoRepository;

    public Produto findById(@NonNull Long id) {
        Optional<Produto> produto = this.produtoRepository.findById(id);
        return produto.orElseThrow(() -> new RuntimeException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName()));
    }
    @Transactional
    public Produto create(@NonNull Produto produto) {
        return this.produtoRepository.save(produto);
    }
    @Transactional
    public Produto update (@NonNull Produto produto) {
        Produto newProduto = findById(produto.getCodigoProduto());
        newProduto.setNome(produto.getNome());
        newProduto.setDescricao(produto.getDescricao());
        newProduto.setPreco(produto.getPreco());
        return produtoRepository.save(newProduto);
    }

    public Produto findByMarcaAndAnoAndModeloInDescricao(@Nullable String marca, String ano, String modelo){
        Optional<Produto> produto = this.produtoRepository.findByMarcaAndAnoAndModeloInDescricao(marca, ano, modelo);
        return produto.orElseThrow(()-> new RuntimeException(
        "Objeto não encontrado! Marca: " + marca + ", Ano: " + ano + ", Modelo: " + modelo + ", Tipo: " + Produto.class.getName()));
        
    }

    public List<Produto> findAll(FilterCriteria filterCriteria) {
        return this.produtoRepository.findAll();
    }
}
