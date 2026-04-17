package com.telusko.Backend.controller;

import com.telusko.Backend.entity.Bill;
import com.telusko.Backend.entity.BillStatus;
import com.telusko.Backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long id) {
        Optional<Bill> bill = billService.getBillById(id);
        if (bill.isPresent()) {
            return ResponseEntity.ok(bill.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Bill createBill(@RequestBody Map<String, Object> billRequest) {
        return billService.createBill(billRequest);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Bill> updateBillStatus(@PathVariable Long id, @RequestBody Map<String, String> statusRequest) {
        try {
            BillStatus status = BillStatus.valueOf(statusRequest.get("status").toUpperCase());
            Optional<Bill> updatedBill = billService.updateBillStatus(id, status);
            if (updatedBill.isPresent()) {
                return ResponseEntity.ok(updatedBill.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        if (billService.deleteBill(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
