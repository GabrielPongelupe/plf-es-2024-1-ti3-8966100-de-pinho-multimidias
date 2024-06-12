package com.depinhomultimidias.depinhomultimidias.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dados_pedido")
public class DadosPedido {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "primeiro_nome", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String primeiroNome;

    @Column(name = "ultimo_nome", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String ultimoNome;

    @Column(name = "email", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String email;

    @Column(name = "estado", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String estado;

    @Column(name = "cidade", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String cidade;

    @Column(name = "bairro", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String bairro;

    @Column(name = "rua", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String rua;

    @Column(name = "numero", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String numero;

    @Column(name = "complemento", nullable = true)
    private String complemento;

    @Column(name = "cep", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String cep;

    @Column(name = "telefone", nullable = false)
    @NotNull(message = "O Campo é obrigatório")
    private String telefone;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @OneToOne(mappedBy = "dadosPedido")
    @JsonIgnore
    private Pedido pedido;

}
