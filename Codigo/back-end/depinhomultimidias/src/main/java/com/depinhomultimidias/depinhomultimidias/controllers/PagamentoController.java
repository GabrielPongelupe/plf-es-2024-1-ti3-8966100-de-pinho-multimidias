package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.depinhomultimidias.depinhomultimidias.models.Pagamento;
import com.depinhomultimidias.depinhomultimidias.services.PagamentoService;

@RestController
@RequestMapping("/pagamento")
@Validated
public class PagamentoController {

    @Autowired
    public PagamentoService pagamentoService;

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.pagamentoService.findById(id));
        
    }
    
}
