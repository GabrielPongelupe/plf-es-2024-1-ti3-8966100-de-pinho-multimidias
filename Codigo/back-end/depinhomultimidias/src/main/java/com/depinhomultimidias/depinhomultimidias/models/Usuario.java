package com.depinhomultimidias.depinhomultimidias.models;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.depinhomultimidias.depinhomultimidias.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails{

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Nonnull
    private Long id;

    @Column(name = "email",unique = true, nullable = false)
    @NotBlank(message = "O Campo é obrigatório")
    private String email;

    @Column(name = "senha",nullable = false)
    @NotBlank(message = "O Campo é obrigatório")
    private String senha;

    @Column(name = "primeiro_nome", nullable = true)
    private String primeiroNome;

    @Column(name = "ultimo_nome",nullable = true)
    private String ultimoNome;

    @Column(name = "contato",nullable = true)
    private String contato;

    @Column(name = "fote_perfil",nullable = true)
    private Blob fotoPerfil;

    
    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidos = new ArrayList<>();

    @Column(name = "Tipo_Usuario", nullable = false)
    private TipoUsuario tipoUsuario;

    public Usuario(String email, String senha, String primeiroNome, String ultimoNome, String contato,  TipoUsuario tipoUsuario) {
        this.email = email;
        this.senha = senha;
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.contato = contato;
        this.tipoUsuario = tipoUsuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.tipoUsuario == TipoUsuario.ADMINISTRADOR) {
            return List.of(
                new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        }else{
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    
}
