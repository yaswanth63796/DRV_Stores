package com.telusko.Backend.service;

import com.telusko.Backend.entity.Bill;
import com.telusko.Backend.entity.BillItem;
import com.telusko.Backend.entity.BillStatus;
import com.telusko.Backend.entity.Product;
import com.telusko.Backend.repository.BillRepository;
import com.telusko.Backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ProductRepository productRepository;

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<Bill> getAllBills() {
        List<Bill> bills = billRepository.findAll();
        bills.forEach(bill -> bill.getItems().size());
        return bills;
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Optional<Bill> getBillById(Long id) {
        Optional<Bill> bill = billRepository.findById(id);
        bill.ifPresent(b -> b.getItems().size());
        return bill;
    }

    public Bill createBill(Map<String, Object> billRequest) {
        Bill bill = new Bill();
        
        if (billRequest.containsKey("orderId") && billRequest.get("orderId") != null) {
            bill.setOrderId(((Number) billRequest.get("orderId")).longValue());
        }
        
        if (billRequest.containsKey("userId") && billRequest.get("userId") != null) {
            bill.setUserId(((Number) billRequest.get("userId")).longValue());
        }
        
        bill.setCustomerName((String) billRequest.get("customerName"));
        bill.setPaymentMethod((String) billRequest.get("paymentMethod"));
        bill.setStatus(BillStatus.UNPAID);
        
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) billRequest.get("items");
        Double totalAmount = 0.0;
        List<BillItem> billItems = new java.util.ArrayList<>();
        
        for (Map<String, Object> itemData : itemsData) {
            BillItem item = new BillItem();
            item.setProductId(((Number) itemData.get("productId")).longValue());
            item.setName((String) itemData.get("name"));
            item.setQuantity(((Number) itemData.get("quantity")).intValue());
            item.setPrice(((Number) itemData.get("price")).doubleValue());
            item.setBill(bill);
            totalAmount += item.getPrice() * item.getQuantity();
            billItems.add(item);
        }
        
        bill.setTotalAmount(totalAmount);
        bill.setItems(billItems); // Enable properly linking items for Cascade save
        
        Bill savedBill = billRepository.save(bill);

        // Reduce product stock for manual bills (where orderId is null)
        if (savedBill.getOrderId() == null || savedBill.getOrderId() == 0) {
            for (BillItem item : billItems) {
                Optional<Product> productOpt = productRepository.findById(item.getProductId());
                if (productOpt.isPresent()) {
                    Product product = productOpt.get();
                    int newStock = product.getStock() - item.getQuantity();
                    product.setStock(newStock >= 0 ? newStock : 0);
                    productRepository.save(product);
                }
            }
        }

        return savedBill;
    }

    @org.springframework.transaction.annotation.Transactional
    public Optional<Bill> updateBillStatus(Long id, BillStatus status) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isPresent()) {
            Bill bill = billOptional.get();
            bill.setStatus(status);
            Bill savedBill = billRepository.save(bill);
            savedBill.getItems().size();
            return Optional.of(savedBill);
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
