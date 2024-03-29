package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.services.ItemPedidoService;

@RestController
@RequestMapping("/item-pedido")
@Validated
public class ItemPedidoController {

    @Autowired
    public ItemPedidoService itemPedidoService;

    @GetMapping("/{id}")
    public ResponseEntity<ItemPedido> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.itemPedidoService.findById(id));
        
    }
    
}
