package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.repositories.ItemPedidoRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class ItemPedidoService {
    @Autowired
    public ItemPedidoRepository itemPedidoRepository;

    public ItemPedido findById(@NonNull Long id) {
        Optional<ItemPedido> itemPedido = this.itemPedidoRepository.findById(id);
        return itemPedido.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + ItemPedido.class.getName()));
    }

    @Transactional
    public ItemPedido create(@NonNull ItemPedido itemPedido) {
        return this.itemPedidoRepository.save(itemPedido);
    }

    @Transactional
    public ItemPedido update(@NonNull ItemPedido itemPedido) {
        ItemPedido newItemPedido = findById(itemPedido.getId());
        if(itemPedido.getProduto() != null)
            newItemPedido.setProduto(itemPedido.getProduto());

        if(itemPedido.getQuantidade() !=null)
            newItemPedido.setQuantidade(itemPedido.getQuantidade());

        if(itemPedido.getPreco() != null)
            newItemPedido.setPreco(itemPedido.getPreco());

        if(itemPedido.getRastramento() != null)
            newItemPedido.setRastramento(itemPedido.getRastramento());

        return itemPedidoRepository.save(newItemPedido);
    }
    @Transactional
    public void delete(@NonNull Long id) {
        ItemPedido itemPedido = findById(id);
        itemPedidoRepository.delete(itemPedido);
    }

}
