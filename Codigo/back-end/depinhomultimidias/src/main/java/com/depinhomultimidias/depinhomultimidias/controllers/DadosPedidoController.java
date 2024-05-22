package com.depinhomultimidias.depinhomultimidias.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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

import com.depinhomultimidias.depinhomultimidias.models.DadosPedido;

import com.depinhomultimidias.depinhomultimidias.services.DadosPedidoService;

@RestController
@RequestMapping("/dados-pedido")
@Validated
public class DadosPedidoController {
    
    @Autowired
    public DadosPedidoService dadosPedidoService;

    @GetMapping("/{id}")
    public ResponseEntity<DadosPedido> findById(@PathVariable Long id) {
        return ResponseEntity.ok(this.dadosPedidoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<DadosPedido> create(@RequestBody DadosPedido dadosPedido) {
        this.dadosPedidoService.create(dadosPedido);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dadosPedido.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosPedido> update(@PathVariable("id") Long id, @RequestBody DadosPedido dadosPedido) {
        dadosPedido.setId(id);
        this.dadosPedidoService.update(dadosPedido);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        this.dadosPedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
     @GetMapping
    public List<DadosPedido> findAllPageable(Pageable pageable) {
        return dadosPedidoService.findAllPageable(pageable).getContent();        
    }
}
