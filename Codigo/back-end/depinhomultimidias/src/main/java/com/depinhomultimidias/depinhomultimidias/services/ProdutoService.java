package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.repositories.ProdutoRepository;

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
}
