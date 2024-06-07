package com.depinhomultimidias.depinhomultimidias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mercadopago.MercadoPagoConfig;

@SpringBootApplication
public class DepinhomultimidiasApplication{

	public static void main(String[] args) {
		SpringApplication.run(DepinhomultimidiasApplication.class, args);
		MercadoPagoConfig.setAccessToken("TEST-1675758345647559-060622-5c0f98d6718d9cfd53d671531e847362-294124782"); // Acess Token
	}

}
