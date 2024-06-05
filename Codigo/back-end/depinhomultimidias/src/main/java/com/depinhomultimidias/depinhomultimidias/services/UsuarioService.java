package com.depinhomultimidias.depinhomultimidias.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.depinhomultimidias.depinhomultimidias.infra.security.TokenService;
import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.UserTipeDTO;
import com.depinhomultimidias.depinhomultimidias.repositories.UsuarioRepository;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import lombok.NonNull;

@Service
public class UsuarioService implements UserDetailsService{
    
    @Autowired
    public UsuarioRepository usuarioRepository;

    @Autowired
    TokenService tokenService;

    public Usuario findById(@NonNull Long id){
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new ObjectNotFoundException(
            "Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName()));
    }

    @Transactional
    public Usuario create(@NonNull Usuario usuario){
        return this.usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario update(@NonNull Usuario usuario){
        Usuario newUsuario = findById(usuario.getId());
        if(usuario.getPrimeiroNome() != null){
            newUsuario.setPrimeiroNome(usuario.getPrimeiroNome());
        }
        if(usuario.getUltimoNome() != null){
            newUsuario.setUltimoNome(usuario.getUltimoNome());
        }
        if(usuario.getFotoPerfil() != null){
            newUsuario.setFotoPerfil(usuario.getFotoPerfil());
        }
        if(usuario.getContato() != null){
            newUsuario.setContato(usuario.getContato());
        }
        if(usuario.getEmail() != null){
            newUsuario.setEmail(usuario.getEmail());
        }
        if(usuario.getSenha() != null){
            newUsuario.setSenha(usuario.getSenha());

        }
        
        return usuarioRepository.save(newUsuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username);
    }

    @Transactional
    public void delete(@NonNull Long id){
        Usuario usuario = findById(id);
        usuarioRepository.delete(usuario);
    }

    public UserTipeDTO getUserTypeByToken(String token) {
        String email = tokenService.validateToken(token);
        if (email.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return null;
        }

        if (usuario.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return new UserTipeDTO("ADMINISTRADOR", usuario.getId());
        } else {
            return new UserTipeDTO("CLIENTE", usuario.getId());
        }
    }
}