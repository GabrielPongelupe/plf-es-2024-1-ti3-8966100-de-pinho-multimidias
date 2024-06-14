package com.depinhomultimidias.depinhomultimidias.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreferenceItem implements Serializable {
    private String title;
    private Integer quantity;
    private Float unitPrice;
    private String pictureUrl;
}
