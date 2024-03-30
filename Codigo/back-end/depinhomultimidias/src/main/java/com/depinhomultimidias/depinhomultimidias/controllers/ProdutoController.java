package com.depinhomultimidias.depinhomultimidias.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.services.ProdutoService;

@RestController
@RequestMapping("/produto")
@Validated
public class ProdutoController {
    @Autowired
    public ProdutoService produtoService;

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.produtoService.findById(id));
        
    }
    @PostMapping
    public ResponseEntity<Produto> create( @RequestBody Produto produto) {
        this.produtoService.create(produto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(produto.getCodigoProduto()).toUri();
        return ResponseEntity.created(uri).build();
    }
     @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable("id") Long id, @RequestBody Produto produto) {
        produto.setCodigoProduto(id);
        this.produtoService.update(produto);
        return ResponseEntity.noContent().build();
    }
}
