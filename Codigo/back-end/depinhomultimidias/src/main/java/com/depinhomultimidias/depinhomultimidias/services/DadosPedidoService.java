package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.DadosPedido;
import com.depinhomultimidias.depinhomultimidias.repositories.DadosPedidoRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;
@Service
public class DadosPedidoService {
    
    @Autowired
    public DadosPedidoRepository dadosPedidoRepository;

    public DadosPedido findById(Long id){
        Optional<DadosPedido> dadosPedido = this.dadosPedidoRepository.findById(id);
        return dadosPedido.orElseThrow(() -> new ObjectNotFoundException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + DadosPedido.class.getName()));
    }

    public DadosPedido create(DadosPedido dadosPedido){
        return this.dadosPedidoRepository.save(dadosPedido);
    }

    public DadosPedido update(DadosPedido dadosPedido){
        DadosPedido newDadosPedido = findById(dadosPedido.getId());
        if(dadosPedido.getPrimeiroNome() != null){
            newDadosPedido.setPrimeiroNome(dadosPedido.getPrimeiroNome());
        }
        if(dadosPedido.getUltimoNome() != null){
            newDadosPedido.setUltimoNome(dadosPedido.getUltimoNome());
        }
        if(dadosPedido.getTelefone() != null){
            newDadosPedido.setTelefone(dadosPedido.getTelefone());
        }
        if(dadosPedido.getNumero() != null){
            newDadosPedido.setNumero(dadosPedido.getNumero());
        }
        if(dadosPedido.getComplemento() != null){
            newDadosPedido.setComplemento(dadosPedido.getComplemento());
        }
        if(dadosPedido.getBairro() != null){
            newDadosPedido.setBairro(dadosPedido.getBairro());
        }
        if(dadosPedido.getCidade() != null){
            newDadosPedido.setCidade(dadosPedido.getCidade());
        }
        if(dadosPedido.getEstado() != null){
            newDadosPedido.setEstado(dadosPedido.getEstado());
        }
        if(dadosPedido.getCep() != null){
            newDadosPedido.setCep(dadosPedido.getCep());
        }
        if (dadosPedido.getPedido() != null) {
            newDadosPedido.setPedido(dadosPedido.getPedido());
        }
        if (dadosPedido.getEmail() != null) {
            newDadosPedido.setEmail(dadosPedido.getEmail());
        }
        if (dadosPedido.getCpf() != null) {
            newDadosPedido.setCpf(dadosPedido.getCpf());
        }

        return dadosPedidoRepository.save(newDadosPedido);
    
    }

    public void delete(Long id){
        DadosPedido dadosPedido = findById(id);
        dadosPedidoRepository.delete(dadosPedido);
    }
    public Page<DadosPedido> findAllPageable(Pageable pageable) {
        return dadosPedidoRepository.findAll(pageable);
    }


}   
