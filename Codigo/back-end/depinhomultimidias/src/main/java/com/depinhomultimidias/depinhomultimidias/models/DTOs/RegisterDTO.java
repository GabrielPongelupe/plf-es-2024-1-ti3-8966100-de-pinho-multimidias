package com.depinhomultimidias.depinhomultimidias.models.DTOs;

import com.depinhomultimidias.depinhomultimidias.enums.TipoUsuario;

public record RegisterDTO(String email, String senha, TipoUsuario role, String primeiroNome, String ultimoNome, String contato ) {
}