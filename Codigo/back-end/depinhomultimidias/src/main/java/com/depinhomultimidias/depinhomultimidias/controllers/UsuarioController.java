package com.depinhomultimidias.depinhomultimidias.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.depinhomultimidias.depinhomultimidias.models.Usuario;
import com.depinhomultimidias.depinhomultimidias.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/usuario")
@Validated
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.usuarioService.findById(id));
        
    }
    
    
}
