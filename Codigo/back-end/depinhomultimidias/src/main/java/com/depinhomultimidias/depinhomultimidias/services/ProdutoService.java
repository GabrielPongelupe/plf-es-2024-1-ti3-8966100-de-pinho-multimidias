package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.repositories.ProdutoRepository;
import com.depinhomultimidias.depinhomultimidias.specification.FilterCriteria;
import com.depinhomultimidias.depinhomultimidias.specification.ProdutoSpecification;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class ProdutoService {

    @Autowired
    public ProdutoRepository produtoRepository;

    public Produto findById(@NonNull Long codigoProduto) {
        Optional<Produto> produto = this.produtoRepository.findBycodigoProduto(codigoProduto);
        return produto.orElseThrow(() -> new RuntimeException(
                "Objeto não encontrado! Id: " + codigoProduto + ", Tipo: " + Produto.class.getName()));
    }
    @Transactional
    public Produto create(@NonNull Produto produto) {
        return this.produtoRepository.save(produto);
    }
    @Transactional
    public Produto update (@NonNull Produto produto) {
        Produto newProduto = findById(produto.getCodigoProduto());
        if(produto.getNome() != null){
            newProduto.setNome(produto.getNome());
        }
        if(produto.getDescricao() != null){
            newProduto.setDescricao(produto.getDescricao());
        }
        if(produto.getPreco() != null){
            newProduto.setPreco(produto.getPreco());
        }
        if(produto.getVideo_relacionado() != null){
            newProduto.setVideo_relacionado(produto.getVideo_relacionado());
        }
        
        return produtoRepository.save(newProduto);
    }

    

    public List<Produto> filtrarProdutos(FilterCriteria filterCriteria) {
        return this.produtoRepository.findAll(ProdutoSpecification.filtrarPorFiltro(filterCriteria));
    }
}
