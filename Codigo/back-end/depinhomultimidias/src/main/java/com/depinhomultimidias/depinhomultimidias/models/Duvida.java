package com.depinhomultimidias.depinhomultimidias.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "duvida")
public class Duvida {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @NotNull(message = "O Campo é obrigatório")
    @Column(name = "pergunta")
    private String pergunta;
    @NotNull(message = "O Campo é obrigatório")
    @Column(name = "resposta")
    private String resposta;
}
