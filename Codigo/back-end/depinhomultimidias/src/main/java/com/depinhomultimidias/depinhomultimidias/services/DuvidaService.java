package com.depinhomultimidias.depinhomultimidias.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Duvida;
import com.depinhomultimidias.depinhomultimidias.repositories.DuvidaRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class DuvidaService {
    @Autowired
    public DuvidaRepository duvidaRepository;

    public Duvida findById(Long id) {
      Optional<Duvida> duvida = this.duvidaRepository.findById(id);  
        return duvida.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Duvida.class.getName()));
     }

     @Transactional
    public Duvida create(@NonNull Duvida duvida) {
        return this.duvidaRepository.save(duvida);
    }
    @Transactional
    public Duvida update(@NonNull Duvida duvida) {
        Duvida newDuvida = findById(duvida.getId());
        if (duvida.getPergunta() != null) {
            newDuvida.setPergunta(duvida.getPergunta());
            
        }
        if (duvida.getResposta() != null) {
            newDuvida.setResposta(duvida.getResposta());
        }
        return duvidaRepository.save(newDuvida);
    }
    @Transactional
    public void delete(Long id) {
        Duvida duvida = findById(id);
        duvidaRepository.delete(duvida);
    }

    public List<Duvida> getAllDuvidas() {
        return duvidaRepository.findAll();
    }

}
