package com.depinhomultimidias.depinhomultimidias.models.DTOs;

public record UserResponseDTO(Long id, String email, String senha, String primeiroNome,
 String ultimoNome, String contato) {
    
}
