package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.ItemPedido;
import com.depinhomultimidias.depinhomultimidias.models.Pedido;
import com.depinhomultimidias.depinhomultimidias.models.Produto;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.ItemPedidoDTO;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.PedidoDTO;
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
    public ProdutoRepository produtoRepository;

    @Autowired
    public UsuarioRepository usuarioRepository;

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
            newPedido.setDadosPedido(pedido.getDadosPedido());
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
    public Pedido createPedido(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setStatus(pedidoDTO.getStatusPedido());
        pedido.setUsuario(usuarioRepository.findById(pedidoDTO.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado")));

        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()) {
            ItemPedido itemPedido = new ItemPedido();
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemDTO.getQuantidade());
            itemPedido.setPedido(pedido);


            pedido.getItens().add(itemPedido);
        }

        return pedidoRepository.save(pedido);
    }
    
}
