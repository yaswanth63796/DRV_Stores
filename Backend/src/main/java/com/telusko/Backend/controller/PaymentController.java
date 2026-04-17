package com.telusko.Backend.controller;

import com.razorpay.Utils;
import com.telusko.Backend.entity.Order;
import com.telusko.Backend.entity.OrderStatus;
import com.telusko.Backend.entity.PaymentStatus;
import com.telusko.Backend.service.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Autowired
    private OrderService orderService;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        String razorpayOrderId = data.get("razorpay_order_id");
        String razorpayPaymentId = data.get("razorpay_payment_id");
        String razorpaySignature = data.get("razorpay_signature");
        Long localOrderId = Long.parseLong(data.get("local_order_id"));

        try {
            System.out.println("Verifying Payment for Order ID: " + localOrderId);
            System.out.println("Razorpay Order ID: " + razorpayOrderId);
            System.out.println("Razorpay Payment ID: " + razorpayPaymentId);

            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            // Using trim() on secret key to avoid issues with hidden spaces
            boolean isValid = Utils.verifyPaymentSignature(options, razorpayKeySecret.trim());
            System.out.println("Payment verification result: " + isValid);

            if (isValid) {
                orderService.updatePaymentStatus(localOrderId, PaymentStatus.SUCCESSFUL, razorpayPaymentId);
                return ResponseEntity.ok(Map.of("status", "success", "message", "Payment verified successfully"));
            } else {
                System.out.println("Verification Failed for signature: " + razorpaySignature);
                return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid signature"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
