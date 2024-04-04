package com.depinhomultimidias.depinhomultimidias.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration // Esta anotação informa ao Spring Security que esta é uma classe de configurações.
@EnableWebSecurity // Esta anotação habilita a configuração do WebSecurity para que possamos configurar nesta classe.
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;
    
    @Bean
    // Este método cria uma corrente de filtros para validar os usuários aptos a fazer esta requisição.
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        
         // Configuração para desabilitar a proteção CSRF (Cross-Site Request Forgery) para a aplicação.
        // CSRF é um tipo de ataque onde um usuário mal-intencionado pode induzir um usuário autenticado a executar ações não intencionadas.
        // Desabilitar CSRF é comum em APIs RESTful, onde os clientes não têm uma sessão estabelecida.
        // Também desabilitamos CSRF porque estamos utilizando STATELESS, ou seja, não mantemos estado de sessão no servidor.
        return httpSecurity.csrf(csrf -> csrf.disable())
        
        // Configuração para gerenciamento de sessão, definindo a política de criação de sessão como STATELESS.
        // Com STATELESS, o servidor não mantém estado da sessão do usuário. Isso é útil para APIs RESTful, onde cada requisição deve ser autocontida e não dependente de estado de sessão.
        // STATELESS é uma abordagem comum em aplicações que usam tokens JWT (JSON Web Tokens) para autenticação e autorização.
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        

        .authorizeHttpRequests(authorize -> authorize
            // A PERMICAO PARA REALIZAR GET DE USUARIO ESTA AI APENAS PARA TESTES 
            .requestMatchers(HttpMethod.GET, "/usuario/{id}").permitAll() //TIRAR DEPOIS
            .requestMatchers(HttpMethod.POST, "/usuario/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/usuario/register").permitAll()
            .requestMatchers(HttpMethod.POST, "/produto").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/usuario").permitAll()
            .anyRequest().authenticated()
        )
        
        // Este método finaliza a configuração do filtro de segurança e constrói a corrente de filtros.
        // O retorno do método é uma instância de SecurityFilterChain, que representa a corrente de filtros para processar requisições de segurança.
        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder PasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}