package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.repositories.ItemPedidoRepository;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class ItemPedidoService {
    @Autowired
    public ItemPedidoRepository itemPedidoRepository;

    public ItemPedido findById(@NonNull Long id) {
        Optional<ItemPedido> itemPedido = this.itemPedidoRepository.findById(id);
        return itemPedido.orElseThrow(() -> new RuntimeException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + ItemPedido.class.getName()));
    }

    @Transactional
    public ItemPedido create(@NonNull ItemPedido itemPedido) {
        return this.itemPedidoRepository.save(itemPedido);
    }

    @Transactional
    public ItemPedido update(@NonNull ItemPedido itemPedido) {
        ItemPedido newItemPedido = findById(itemPedido.getId());
        newItemPedido.setProduto(itemPedido.getProduto());
        newItemPedido.setQuantidade(itemPedido.getQuantidade());
        newItemPedido.setPreco(itemPedido.getPreco());
        return itemPedidoRepository.save(newItemPedido);
    }

}
