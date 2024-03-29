package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Pedido;
import com.depinhomultimidias.depinhomultimidias.repositories.PedidoRepository;

import lombok.NonNull;

@Service
public class PedidoService {
    @Autowired
    public PedidoRepository pedidoRepository;

    public Pedido findById(@NonNull Long id) {
        Optional<Pedido> pedido = this.pedidoRepository.findById(id);
        return pedido.orElseThrow(() -> new RuntimeException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Pedido.class.getName()));
    }
}
