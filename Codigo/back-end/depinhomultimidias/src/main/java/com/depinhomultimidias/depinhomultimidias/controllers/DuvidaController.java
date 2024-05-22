package com.depinhomultimidias.depinhomultimidias.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.depinhomultimidias.depinhomultimidias.models.Duvida;
import com.depinhomultimidias.depinhomultimidias.services.DuvidaService;



import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;






@RestController
@RequestMapping("/duvida")
@Validated
public class DuvidaController {
@Autowired
    public DuvidaService duvidaService;

    @GetMapping("/{id}")
    public ResponseEntity<Duvida> findById(@PathVariable Long id) {
        return ResponseEntity.ok(this.duvidaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Duvida> create(@RequestBody Duvida duvida) {
        this.duvidaService.create(duvida);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(duvida.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Duvida> update(@PathVariable("id") Long id, @RequestBody Duvida duvida) {
       duvida.setId(id);
       this.duvidaService.update(duvida);
         return ResponseEntity.noContent().build();

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        this.duvidaService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<Duvida>> getAllDuvidas() {
        List<Duvida> duvidas = duvidaService.getAllDuvidas();
        return ResponseEntity.ok(duvidas);
    }

}
