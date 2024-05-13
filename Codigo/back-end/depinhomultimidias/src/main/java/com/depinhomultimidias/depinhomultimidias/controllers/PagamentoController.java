package com.depinhomultimidias.depinhomultimidias.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    @PostMapping
    public ResponseEntity<Pagamento> create( @RequestBody Pagamento pagamento) {
        this.pagamentoService.create(pagamento);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(pagamento.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
     @PutMapping("/{id}")
    public ResponseEntity<Pagamento> update(@PathVariable("id") Long id, @RequestBody Pagamento pagamento) {
        pagamento.setId(id);
        this.pagamentoService.update(pagamento);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        this.pagamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
