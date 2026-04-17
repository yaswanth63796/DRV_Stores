package com.telusko.Backend.service;

import com.telusko.Backend.entity.Order;
import com.telusko.Backend.entity.OrderItem;
import com.telusko.Backend.entity.OrderStatus;
import com.telusko.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Map<String, Object> orderRequest) {
        Order order = new Order();
        
        if (orderRequest.containsKey("userId")) {
            order.setUserId(((Number) orderRequest.get("userId")).longValue());
        }
        
        order.setStatus(OrderStatus.PENDING);
        
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) orderRequest.get("items");
        Double totalAmount = 0.0;
        
        for (Map<String, Object> itemData : itemsData) {
            OrderItem item = new OrderItem();
            item.setProductId(((Number) itemData.get("productId")).longValue());
            item.setName((String) itemData.get("name"));
            item.setQuantity(((Number) itemData.get("quantity")).intValue());
            item.setPrice(((Number) itemData.get("price")).doubleValue());
            item.setOrder(order);
            totalAmount += item.getPrice() * item.getQuantity();
        }
        
        order.setTotalAmount(totalAmount);
        order.setItems(null); // Will be set by cascade
        
        return orderRepository.save(order);
    }

    public Optional<Order> updateOrderStatus(Long id, OrderStatus status) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            return Optional.of(orderRepository.save(order));
        }
        return Optional.empty();
    }

    public boolean deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
