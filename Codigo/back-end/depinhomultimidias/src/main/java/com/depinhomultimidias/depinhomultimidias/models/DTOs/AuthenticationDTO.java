package com.depinhomultimidias.depinhomultimidias.models.DTOs;


// Em Java, a palavra-chave record foi introduzida a partir do Java 14
// como uma nova forma de criar classes imutáveis, que são frequentemente
// usadas para representar dados. Um record é uma classe que possui uma 
// série de características específicas que o tornam ideal para a representação
// de dados simples e imutáveis.

public record AuthenticationDTO(String email, String senha) {
    
}  
    

