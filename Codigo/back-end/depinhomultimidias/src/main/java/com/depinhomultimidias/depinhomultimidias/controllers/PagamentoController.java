package com.depinhomultimidias.depinhomultimidias.controllers;

import java.math.BigDecimal;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import com.depinhomultimidias.depinhomultimidias.models.Pagamento;
import com.depinhomultimidias.depinhomultimidias.models.DTOs.PreferenceItem;
import com.depinhomultimidias.depinhomultimidias.services.PagamentoService;
import com.depinhomultimidias.depinhomultimidias.services.exceptions.ObjectNotFoundException;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/pagamento")
@Validated
public class PagamentoController {
 
    @Autowired
    public PagamentoService pagamentoService;

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.pagamentoService.findById(id));
        
    }
    @PostMapping
    public ResponseEntity<Pagamento> create(@RequestBody Pagamento pagamento) {
        this.pagamentoService.create(pagamento);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(pagamento.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
     @PutMapping("/{id}")
    public ResponseEntity<Pagamento> update(@PathVariable("id") Long id, @RequestBody Pagamento pagamento) {
        pagamento.setId(id);
        this.pagamentoService.update(pagamento);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        this.pagamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/general")
    public RedirectView sucess(HttpServletRequest request,
                        @RequestBody Pagamento pagamento,
                        @RequestParam("collection_id") String collectionId,
                        @RequestParam("collection_status") String collectionStatus,
                        @RequestParam("external_reference") String externalReference,
                        @RequestParam("payment_type") String paymentType,
                        @RequestParam("merchant_order_id") String merchantOrderId,
                        @RequestParam("preference_id") String preferenceId,
                        @RequestParam("site_id") String siteId,
                        @RequestParam("processing_mode") String processingMode,
                        @RequestParam("merchant_account_id") String merchantAccountId,
                        RedirectAttributes attributes) throws MPException {
                            attributes.addFlashAttribute("genericResponse", true);
                            attributes.addFlashAttribute("collection_id", collectionId);
                            attributes.addFlashAttribute("collection_status", collectionStatus);
                            attributes.addFlashAttribute("external_reference", externalReference);
                            attributes.addFlashAttribute("payment_type", paymentType);
                            attributes.addFlashAttribute("merchant_order_id", merchantOrderId);
                            attributes.addFlashAttribute("preference_id",preferenceId);
                            attributes.addFlashAttribute("site_id",siteId);
                            attributes.addFlashAttribute("processing_mode",processingMode);
                            attributes.addFlashAttribute("merchant_account_id",merchantAccountId);
                            return new RedirectView("/");
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody List<PreferenceItem> preferenceItems) throws MPException {
        if (preferenceItems == null || preferenceItems.isEmpty()) {
            throw new ObjectNotFoundException("Itens não encontrados");
        }
        try {
    
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .pending("http://127.0.0.1:8081/front-end/src/perfil.html")
                .success("http://127.0.0.1:8081/front-end/src/perfil.html")
                .failure("http://127.0.0.1:8081/front-end/src/perfil.html")
                .build();       
    
            List<PreferenceItemRequest> items = new ArrayList<>();
            for (PreferenceItem preferenceItem : preferenceItems) {
                PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(preferenceItem.getTitle())
                    .pictureUrl(preferenceItem.getPictureUrl())
                    .quantity(preferenceItem.getQuantity())
                    .unitPrice(BigDecimal.valueOf(preferenceItem.getUnitPrice()))
                    .currencyId("BRL")
                    .build();
                items.add(itemRequest);
            }
    
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .backUrls(backUrls)
                .items(items)
                .build();
    
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);
    
            if (StringUtils.isEmpty(preference.getId())) {
                throw new ObjectNotFoundException("Preferência não criada. Verifique se o Token de Acesso é válido");
            }
    
            System.out.println("Preferência criada com sucesso, ID: " + preference.getId());
            return ResponseEntity.ok(preference.getSandboxInitPoint());
    
        } catch (MPException | MPApiException e) {
            System.err.println("Erro ao criar preferência: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}