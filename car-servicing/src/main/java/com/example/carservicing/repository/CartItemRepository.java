// filepath: src/main/java/com/example/carservicing/repository/CartItemRepository.java
package com.example.carservicing.repository;

import com.example.carservicing.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
