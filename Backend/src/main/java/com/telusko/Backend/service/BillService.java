package com.telusko.Backend.service;

import com.telusko.Backend.entity.Bill;
import com.telusko.Backend.entity.BillItem;
import com.telusko.Backend.entity.BillStatus;
import com.telusko.Backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Optional<Bill> getBillById(Long id) {
        return billRepository.findById(id);
    }

    public Bill createBill(Map<String, Object> billRequest) {
        Bill bill = new Bill();
        
        if (billRequest.containsKey("orderId")) {
            bill.setOrderId(((Number) billRequest.get("orderId")).longValue());
        }
        
        if (billRequest.containsKey("userId")) {
            bill.setUserId(((Number) billRequest.get("userId")).longValue());
        }
        
        bill.setCustomerName((String) billRequest.get("customerName"));
        bill.setPaymentMethod((String) billRequest.get("paymentMethod"));
        bill.setStatus(BillStatus.UNPAID);
        
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) billRequest.get("items");
        Double totalAmount = 0.0;
        
        for (Map<String, Object> itemData : itemsData) {
            BillItem item = new BillItem();
            item.setProductId(((Number) itemData.get("productId")).longValue());
            item.setName((String) itemData.get("name"));
            item.setQuantity(((Number) itemData.get("quantity")).intValue());
            item.setPrice(((Number) itemData.get("price")).doubleValue());
            item.setBill(bill);
            totalAmount += item.getPrice() * item.getQuantity();
        }
        
        bill.setTotalAmount(totalAmount);
        bill.setItems(null); // Will be set by cascade
        
        return billRepository.save(bill);
    }

    public Optional<Bill> updateBillStatus(Long id, BillStatus status) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isPresent()) {
            Bill bill = billOptional.get();
            bill.setStatus(status);
            return Optional.of(billRepository.save(bill));
        }
        return Optional.empty();
    }

    public boolean deleteBill(Long id) {
        if (billRepository.existsById(id)) {
            billRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
