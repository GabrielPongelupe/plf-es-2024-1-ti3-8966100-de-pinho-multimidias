package com.depinhomultimidias.depinhomultimidias.specification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterCriteria {
    private String modelo;
    private String marca;
    private Integer ano;
    private boolean possuiComandoVolante;
    private boolean possuiRadioOriginal;
}
