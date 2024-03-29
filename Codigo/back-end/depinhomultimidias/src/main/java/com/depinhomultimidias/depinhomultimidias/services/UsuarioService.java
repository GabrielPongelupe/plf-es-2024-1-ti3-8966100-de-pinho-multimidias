package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.repositories.UsuarioRepository;

import lombok.NonNull;

@Service
public class UsuarioService {
    
    @Autowired
    public UsuarioRepository usuarioRepository;

    public Usuario findById(@NonNull Long id){
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new RuntimeException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName()));
    }
}
