package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.depinhomultimidias.depinhomultimidias.models.Pagamento;
import com.depinhomultimidias.depinhomultimidias.repositories.PagamentoRepository;

import lombok.NonNull;

@Service
public class PagamentoService {
    @Autowired
    public PagamentoRepository pagamentoRepository;

     public Pagamento findById(@NonNull Long id){
        Optional<Pagamento> pagamento = this.pagamentoRepository.findById(id);
        return pagamento.orElseThrow(() -> new RuntimeException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Pagamento.class.getName()));

    
}
    
}
