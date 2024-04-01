package com.depinhomultimidias.depinhomultimidias.infra.security;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.depinhomultimidias.depinhomultimidias.models.Usuario;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


import org.springframework.beans.factory.annotation.Value;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;
    
    //Gera token de autenticação para requisicoes Http
    public String generateToken(Usuario usuario){

        try {
            // CADA APLICACAO TEM SUA PROPRIA 'CHAVE' PARA CRIPTOGRAFIA DE TOKENS .Algorithm.HMAC256()
            // DEFINE ESSA CHAVE E APLICA ELA
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                        .withIssuer("dePinho")
                        .withSubject(usuario.getEmail())
                        .withExpiresAt(genExpirationDate())
                        .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro de geração de Token", e);
        }
        
        
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                .withIssuer("dePinho")
                .build()
                .verify(token)
                .getSubject();

        } catch (JWTVerificationException e) {
            return "";
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
