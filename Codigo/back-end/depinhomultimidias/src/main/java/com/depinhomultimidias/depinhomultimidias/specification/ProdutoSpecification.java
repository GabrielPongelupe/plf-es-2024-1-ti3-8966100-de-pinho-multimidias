package com.depinhomultimidias.depinhomultimidias.specification;


import org.springframework.data.jpa.domain.Specification;

import com.depinhomultimidias.depinhomultimidias.models.Produto;


import jakarta.persistence.criteria.Predicate;


public class ProdutoSpecification {

    private FilterCriteria criteria;

    public ProdutoSpecification(FilterCriteria criteria) {
        this.criteria = criteria;
    }

    public static Specification<Produto> filtrarPorFiltro(FilterCriteria filtro) {
        return Specification.where(
                marcaLike(filtro.getMarca()))
                .and(anoBetween(filtro.getAno()))
                .and(modeloLike(filtro.getModelo()));
    }

    private static Specification<Produto> marcaLike(String marca) {
        return (root, query, builder) -> marca == null ? null
                : builder.like(builder.lower(root.get("descricao")), "%" + marca.toLowerCase() + "%");
    }

    private static Specification<Produto> anoBetween(Integer ano) {
        return (root, query, builder) -> {
            if (ano == null) {
                return null;
            } else {
                
                Predicate anoInicio = builder.lessThanOrEqualTo(root.get("anoInicio"), ano);
                Predicate anoFinal = builder.greaterThanOrEqualTo(root.get("anoFim"), ano);
                return builder.and(anoInicio, anoFinal);
            }
        };
            
    }

    private static Specification<Produto> modeloLike(String modelo) {
        return (root, query, builder) -> modelo == null ? null
                : builder.like(builder.lower(root.get("descricao")), "%" + modelo.toLowerCase() + "%");
    }

}
