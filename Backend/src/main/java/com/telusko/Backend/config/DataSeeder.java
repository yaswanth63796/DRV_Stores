package com.telusko.Backend.config;

import com.telusko.Backend.entity.Product;
import com.telusko.Backend.entity.User;
import com.telusko.Backend.entity.UserRole;
import com.telusko.Backend.repository.ProductRepository;
import com.telusko.Backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        
        // Ensure Default Shopkeeper is present
        if (!userRepository.existsByEmail("Kalavathi123@gmail.com")) {
            User shopkeeper = new User();
            shopkeeper.setName("Kalavathi");
            shopkeeper.setUsername("kalavathi123");
            shopkeeper.setEmail("Kalavathi123@gmail.com");
            shopkeeper.setPassword(passwordEncoder.encode("Kalavathi@312"));
            shopkeeper.setRole(UserRole.SHOPKEEPER);
            shopkeeper.setPhone("0000000000"); // Generic filler
            userRepository.save(shopkeeper);
            System.out.println("✅ Data Seeder: Default Shopkeeper Account Initialized!");
        }

        // Run seed only if the table is empty
        if (productRepository.count() == 0) {
            
            Product p1 = new Product();
            p1.setName("பருப்பு (Dal)");
            p1.setDescription("துவரம் பருப்பு");
            p1.setPrice(120.0);
            p1.setStock(30);
            p1.setCategory("மளிகை (Groceries)");

            Product p2 = new Product();
            p2.setName("எண்ணெய் (Oil)");
            p2.setDescription("சூரியகாந்தி எண்ணெய்");
            p2.setPrice(150.0);
            p2.setStock(8);
            p2.setCategory("எண்ணெய் (Oil)");

            Product p3 = new Product();
            p3.setName("சர்க்கரை (Sugar)");
            p3.setDescription("வெள்ளை சர்க்கரை");
            p3.setPrice(45.0);
            p3.setStock(40);
            p3.setCategory("மளிகை (Groceries)");

            Product p4 = new Product();
            p4.setName("உப்பு (Salt)");
            p4.setDescription("டாடா உப்பு");
            p4.setPrice(20.0);
            p4.setStock(60);
            p4.setCategory("மளிகை (Groceries)");

            Product p5 = new Product();
            p5.setName("தேயிலை (Tea)");
            p5.setDescription("டாடா தேயிலை தூள்");
            p5.setPrice(180.0);
            p5.setStock(25);
            p5.setCategory("பானங்கள் (Beverages)");

            Product p6 = new Product();
            p6.setName("மசாலா (Spices)");
            p6.setDescription("கரம் மசாலா தூள்");
            p6.setPrice(90.0);
            p6.setStock(40);
            p6.setCategory("மசாலா (Spices)");

            List<Product> products = Arrays.asList(p1, p2, p3, p4, p5, p6);
            productRepository.saveAll(products);

            System.out.println("✅ Data Seeder: Products Initialized Successfully with Tamil Translations!");
        } else {
            System.out.println("⚡ Data Seeder: Products table already has data, skipping seed.");
        }
    }
}
