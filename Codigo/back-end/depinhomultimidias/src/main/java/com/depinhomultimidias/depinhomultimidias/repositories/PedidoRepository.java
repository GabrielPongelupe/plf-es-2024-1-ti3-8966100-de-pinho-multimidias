package com.depinhomultimidias.depinhomultimidias.repositories;

import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.depinhomultimidias.depinhomultimidias.models.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Long> {

}
