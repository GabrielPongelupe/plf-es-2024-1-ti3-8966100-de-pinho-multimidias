package com.depinhomultimidias.depinhomultimidias.models.DTOs;

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
public class ItemPedidoDTO {
    private Long produtoId;
    private Integer quantidade;

    // getters e setters
}
