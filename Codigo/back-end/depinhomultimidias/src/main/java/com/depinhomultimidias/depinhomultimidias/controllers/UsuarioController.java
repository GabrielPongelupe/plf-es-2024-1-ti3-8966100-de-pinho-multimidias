package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.depinhomultimidias.depinhomultimidias.infra.security.TokenService;
import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.AuthenticationDTO;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.LoginResponseDTO;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.RegisterDTO;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.TokenDTO;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.UserTipeDTO;
import com.depinhomultimidias.depinhomultimidias.repositories.UsuarioRepository;
import com.depinhomultimidias.depinhomultimidias.services.UsuarioService;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;

import jakarta.validation.Valid;

import java.net.URI;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/usuario")
@Validated
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;



    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.usuarioService.findById(id));
        
    }

    @GetMapping("pedidos{id}")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping
    public ResponseEntity<Usuario> create( @RequestBody Usuario usuario) {
        this.usuarioService.create(usuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO data){
        if(this.usuarioRepository.findByEmail(data.email()) != null){
            return ResponseEntity.badRequest().build();
        }
        String senhaCriptografada = new BCryptPasswordEncoder().encode(data.senha());
        Usuario novoUsuario = new Usuario(
            data.email(), senhaCriptografada, data.primeiroNome(),  data.ultimoNome(), data.contato(), data.role()
            );

        this.usuarioService.create(novoUsuario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable("id") Long id, @Valid @RequestBody Usuario usuario) {
        usuario.setId(id);
        this.usuarioService.update(usuario);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        this.usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tipoUser")
    public ResponseEntity<UserTipeDTO> getUserType(@RequestBody @Valid TokenDTO token1) {
        if(token1.token().isEmpty()){
            throw new RuntimeException("Token inválida, faça login novamente");
        }
        String authHeader = token1.token();
        if (authHeader == null || authHeader.isEmpty()) {
            return ResponseEntity.ok(null);
        }

        String token = authHeader.replace("Bearer ", "");
        UserTipeDTO userType = usuarioService.getUserTypeByToken(token);
        if(userType.tipo().isEmpty()){
            throw new RuntimeException("Token inválida, faça login novamente");
        }
        return ResponseEntity.ok(userType);
    }

    
    
    
    
}