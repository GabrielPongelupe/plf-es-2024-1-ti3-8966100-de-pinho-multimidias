package com.depinhomultimidias.depinhomultimidias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mercadopago.MercadoPagoConfig;

@SpringBootApplication
public class DepinhomultimidiasApplication{

	public static void main(String[] args) {
		SpringApplication.run(DepinhomultimidiasApplication.class, args);
		MercadoPagoConfig.setAccessToken(System.getenv("MP_ACCESS_TOKEN"));
		
	}

}
