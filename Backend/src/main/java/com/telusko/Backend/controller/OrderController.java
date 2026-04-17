package com.telusko.Backend.controller;

import com.telusko.Backend.entity.Order;
import com.telusko.Backend.entity.OrderItem;
import com.telusko.Backend.entity.OrderStatus;
import com.telusko.Backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private com.telusko.Backend.service.UserService userService;

    @GetMapping
    public List<Map<String, Object>> getAllOrders() {
        return orderService.getAllOrders().stream().map(order -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", order.getId());
            map.put("userId", order.getUserId());
            map.put("status", order.getStatus());
            map.put("paymentStatus", order.getPaymentStatus());
            map.put("totalAmount", order.getTotalAmount());
            map.put("createdAt", order.getCreatedAt());
            map.put("items", order.getItems());
            map.put("paymentId", order.getRazorpayPaymentId());
            
            com.telusko.Backend.entity.User user = userService.getUserById(order.getUserId());
            map.put("customerName", user != null ? (user.getName() != null ? user.getName() : user.getUsername()) : "Customer");
            return map;
        }).collect(java.util.stream.Collectors.toList());
    }

    @GetMapping(params = "userId")
    public List<Order> getOrdersByUserId(@RequestParam Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Order createOrder(@RequestBody Map<String, Object> orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> statusRequest) {
        try {
            OrderStatus status = OrderStatus.valueOf(statusRequest.get("status").toUpperCase());
            Optional<Order> updatedOrder = orderService.updateOrderStatus(id, status);
            if (updatedOrder.isPresent()) {
                return ResponseEntity.ok(updatedOrder.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.deleteOrder(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
