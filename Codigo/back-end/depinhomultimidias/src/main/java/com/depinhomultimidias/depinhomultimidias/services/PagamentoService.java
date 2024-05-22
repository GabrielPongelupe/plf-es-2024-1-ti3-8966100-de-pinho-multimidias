package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Pagamento;
import com.depinhomultimidias.depinhomultimidias.repositories.PagamentoRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class PagamentoService {
    @Autowired
    public PagamentoRepository pagamentoRepository;

    public Pagamento findById(@NonNull Long id) {
        Optional<Pagamento> pagamento = this.pagamentoRepository.findById(id);
        return pagamento.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Pagamento.class.getName()));
    }

    @Transactional
    public Pagamento create(@NonNull Pagamento pagamento) {
        return this.pagamentoRepository.save(pagamento);
    }

    @Transactional
    public Pagamento update(@NonNull Pagamento pagamento) {
        Pagamento newPagamento = findById(pagamento.getId());
        newPagamento.setPedido(pagamento.getPedido());
        return pagamentoRepository.save(newPagamento);
    }
    @Transactional
    public void delete(@NonNull Long id) {
        Pagamento pagamento = findById(id);
        pagamentoRepository.delete(pagamento);
    }

}
