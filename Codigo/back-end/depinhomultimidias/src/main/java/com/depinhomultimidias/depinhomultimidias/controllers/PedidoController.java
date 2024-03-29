package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import com.depinhomultimidias.depinhomultimidias.models.Pedido;
import com.depinhomultimidias.depinhomultimidias.services.PedidoService;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/pedido")
@Validated

public class PedidoController {
    @Autowired
    public PedidoService pedidoService;

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> findById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(this.pedidoService.findById(id));
        
    }
    
    
}
