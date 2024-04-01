package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class UsuarioService implements UserDetailsService{
    
    @Autowired
    public UsuarioRepository usuarioRepository;

    public Usuario findById(@NonNull Long id){
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new RuntimeException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName()));
    }

    @Transactional
    public Usuario create(@NonNull Usuario usuario){
        return this.usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario update(@NonNull Usuario usuario){
        Usuario newUsuario = findById(usuario.getId());
        newUsuario.setPrimeiroNome(usuario.getPrimeiroNome());
        newUsuario.setUltimoNome(usuario.getUltimoNome());
        newUsuario.setFotoPerfil(usuario.getFotoPerfil());
        newUsuario.setContato(usuario.getContato());
        newUsuario.setEmail(usuario.getEmail());
        newUsuario.setSenha(usuario.getSenha());
        return usuarioRepository.save(newUsuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username);
    }
}
