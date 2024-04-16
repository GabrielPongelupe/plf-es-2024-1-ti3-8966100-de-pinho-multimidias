package com.depinhomultimidias.depinhomultimidias.specification;

import org.antlr.v4.runtime.atn.SemanticContext.Predicate;
import org.springframework.boot.autoconfigure.rsocket.RSocketProperties.Server.Spec;
import org.springframework.data.jpa.domain.Specification;

import com.depinhomultimidias.depinhomultimidias.models.Produto;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class ProdutoSpecification {

    private FilterCriteria criteria;

    public ProdutoSpecification(FilterCriteria criteria) {
        this.criteria = criteria;
    }

    public static Specification<Produto> filtrarPorFiltro(FilterCriteria filtro) {
        return Specification.where(
            marcaLike(filtro.getMarca())
        ).and(
            anoLike(filtro.getAno())
        ).and(
            modeloLike(filtro.getModelo())
        );
    }

    private static Specification<Produto> marcaLike(String marca) {
        return (root, query, builder) ->
            marca == null ? null : builder.like(builder.lower(root.get("descricao")), "%" + marca.toLowerCase() + "%");
    }

    private static Specification<Produto> anoLike(String ano) {
        return (root, query, builder) ->
            ano == null ? null : builder.like(builder.lower(root.get("descricao")), "%" + ano.toLowerCase() + "%");
    }

    private static Specification<Produto> modeloLike(String modelo) {
        return (root, query, builder) ->
            modelo == null ? null : builder.like(builder.lower(root.get("descricao")), "%" + modelo.toLowerCase() + "%");
    }
    
}
