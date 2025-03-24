// filepath: src/main/java/com/example/carservicing/controller/CartController.java
package com.example.carservicing.controller;

import com.example.carservicing.model.CartItem;
import com.example.carservicing.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        logger.info("Fetching all cart items");
        List<CartItem> items = cartItemRepository.findAll();
        logger.info("Found {} items in cart", items.size());
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
        logger.info("Adding item to cart: {}", cartItem);
        CartItem savedItem = cartItemRepository.save(cartItem);
        logger.info("Successfully added item: {}", savedItem);
        return ResponseEntity.ok(savedItem);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        logger.info("Clearing cart");
        cartItemRepository.deleteAll();
        logger.info("Cart cleared successfully");
        return ResponseEntity.ok().build();
    }
}
