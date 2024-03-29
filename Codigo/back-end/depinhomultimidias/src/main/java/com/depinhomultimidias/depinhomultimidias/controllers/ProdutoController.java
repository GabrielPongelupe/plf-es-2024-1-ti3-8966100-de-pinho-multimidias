package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
