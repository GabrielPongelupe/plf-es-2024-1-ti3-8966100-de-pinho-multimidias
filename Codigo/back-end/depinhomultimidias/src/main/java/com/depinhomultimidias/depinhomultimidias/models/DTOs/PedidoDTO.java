package com.depinhomultimidias.depinhomultimidias.models.DTOs;

import java.util.List;

import com.depinhomultimidias.depinhomultimidias.enums.StatusPedido;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PedidoDTO {
    private Long clienteId;
    private int statusPedido;
    private List<ItemPedidoDTO> itens;

    // getters e setters
}