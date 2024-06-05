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

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.services.ItemPedidoService;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


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
    @PostMapping
    public ResponseEntity<ItemPedido> create(@RequestBody ItemPedido itemPedido) {
        ItemPedido createdItemPedido = this.itemPedidoService.create(itemPedido);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdItemPedido.getId()).toUri();
        return ResponseEntity.created(uri).body(createdItemPedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemPedido> update(@PathVariable("id") Long id, @RequestBody ItemPedido itemPedido) {
        itemPedido.setId(id);
        this.itemPedidoService.update(itemPedido);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        this.itemPedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
}
