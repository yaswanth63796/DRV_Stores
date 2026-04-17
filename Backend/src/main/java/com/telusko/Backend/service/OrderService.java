package com.telusko.Backend.service;

import com.telusko.Backend.entity.Order;
import com.telusko.Backend.entity.OrderItem;
import com.telusko.Backend.entity.OrderStatus;
import com.telusko.Backend.entity.PaymentStatus;
import com.telusko.Backend.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

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
        order.setPaymentStatus(PaymentStatus.PENDING);
        
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) orderRequest.get("items");
        Double totalAmount = 0.0;
        List<OrderItem> orderItems = new java.util.ArrayList<>();
        
        for (Map<String, Object> itemData : itemsData) {
            OrderItem item = new OrderItem();
            item.setProductId(((Number) itemData.get("productId")).longValue());
            item.setName((String) itemData.get("name"));
            item.setQuantity(((Number) itemData.get("quantity")).intValue());
            item.setPrice(((Number) itemData.get("price")).doubleValue());
            item.setOrder(order);
            totalAmount += item.getPrice() * item.getQuantity();
            orderItems.add(item);
        }
        
        order.setTotalAmount(totalAmount);
        order.setItems(orderItems); // Attach the collection for JPA cascade to work
        
        Order savedOrder = orderRepository.save(order);

        // Razorpay Integration
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            JSONObject razorpayOrderRequest = new JSONObject();
            razorpayOrderRequest.put("amount", (int)(totalAmount * 100)); // Amount in paise
            razorpayOrderRequest.put("currency", "INR");
            razorpayOrderRequest.put("receipt", "order_rcptid_" + savedOrder.getId());
            
            com.razorpay.Order razorpayOrder = razorpay.orders.create(razorpayOrderRequest);
            String razorpayOrderId = razorpayOrder.get("id");
            
            savedOrder.setRazorpayOrderId(razorpayOrderId);
            return orderRepository.save(savedOrder);
        } catch (RazorpayException e) {
            // Log and handle error (in production, you might want to rollback or mark as FAILED)
            System.err.println("Error creating Razorpay order: " + e.getMessage());
            return savedOrder;
        }
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

    public Optional<Order> updatePaymentStatus(Long id, PaymentStatus status, String paymentId) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setPaymentStatus(status);
            if (paymentId != null) {
                order.setRazorpayPaymentId(paymentId);
            }
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
