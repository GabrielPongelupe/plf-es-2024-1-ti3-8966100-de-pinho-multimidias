package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.DadosPedido;
import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.models.Pedido;
import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.repositories.DadosPedidoRepository;
import com.depinhomultimidias.depinhomultimidias.repositories.PedidoRepository;
import com.depinhomultimidias.depinhomultimidias.repositories.ProdutoRepository;
import com.depinhomultimidias.depinhomultimidias.repositories.UsuarioRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class PedidoService {
    @Autowired
    public PedidoRepository pedidoRepository;

    @Autowired
    public DadosPedidoRepository dadosPedidoRepository;


    public Pedido findById(@NonNull Long id) {
        Optional<Pedido> pedido = this.pedidoRepository.findById(id);
        return pedido.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Pedido.class.getName()));
    }

    @Transactional
    public Pedido create(@NonNull Pedido pedido) {
        System.out.println(pedido.getUsuario());
        return this.pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido update(@NonNull Pedido pedido) {
        Pedido newPedido = findById(pedido.getId());
        if (pedido.getItens() != null) {
            newPedido.setItens(pedido.getItens());
        }
        if(pedido.getPagamentos() != null) {
            newPedido.setPagamentos(pedido.getPagamentos());
        }
        if(pedido.getDadosPedido() != null) {
            DadosPedido dadosPedido = dadosPedidoRepository.findById(pedido.getDadosPedido().getId())
                    .orElseThrow(() -> new ObjectNotFoundException("DadosPedido não encontrado"));
            newPedido.setDadosPedido(dadosPedido);
        }
        newPedido.setStatus(pedido.getStatus());
        return pedidoRepository.save(newPedido);
    }

    @Transactional
   public Page<Pedido> findAllPageable(Pageable pageable) {
        return pedidoRepository.findAll(pageable);
    }

    @Transactional
    public void delete(@NonNull Long id) {
        Pedido pedido = findById(id);
        pedidoRepository.delete(pedido);
    }

    

    
}
