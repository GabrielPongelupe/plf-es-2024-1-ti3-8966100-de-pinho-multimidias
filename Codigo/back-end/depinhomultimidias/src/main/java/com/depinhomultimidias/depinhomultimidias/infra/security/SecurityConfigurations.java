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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return  httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers(HttpMethod.GET, "/usuario/{id}").hasRole("ADMIN") //TIRAR DEPOIS
                    .requestMatchers(HttpMethod.POST, "/usuario/login").permitAll()
                    .requestMatchers(HttpMethod.POST, "/usuario/register").permitAll()
                    .requestMatchers(HttpMethod.POST, "/produto").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/usuario/{id}").authenticated()
                    .requestMatchers(HttpMethod.GET, "/produto/filtro").permitAll()
                    .requestMatchers(HttpMethod.GET, "/usuario/tipoUser").authenticated()
                    .requestMatchers(HttpMethod.DELETE, "/produto/delete/{id}").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET, "/produto").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/produto/{id}").hasRole("ADMIN")


            //PONGE, renato e arthur, nos tivemos que colocar permit all nos metodos das duvidas pq estavamos tomando 403 ate colocando a autentication key seja no console saja no postman, logo futuramnte voce pode olhar isso ai, cordialmente Renato

                    .requestMatchers(HttpMethod.POST, "/duvida").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/duvida/{id}").permitAll()
                    .requestMatchers(HttpMethod.GET, "/duvida/{id}").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/duvida/delete/{id}").permitAll()
                    .requestMatchers(HttpMethod.GET, "/duvida").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/duvida/{id}").permitAll()



                    .requestMatchers(HttpMethod.GET, "/dados-pedido/{id}").permitAll()
                    .requestMatchers(HttpMethod.GET, "/dados-pedido").permitAll()
                    .requestMatchers(HttpMethod.POST, "/dados-pedido").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/dados-pedido/{id}").permitAll()
                    .requestMatchers(HttpMethod.DELETE, "/dados-pedido/delete/{id}").permitAll()

                    .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
