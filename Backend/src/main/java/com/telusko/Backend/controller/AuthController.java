package com.telusko.Backend.controller;

import com.telusko.Backend.entity.User;
import com.telusko.Backend.service.JWTService;
import com.telusko.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getId());
            response.put("name", registeredUser.getName());
            response.put("username", registeredUser.getUsername());
            response.put("email", registeredUser.getEmail());
            response.put("role", registeredUser.getRole());
            response.put("phone", registeredUser.getPhone());
            response.put("message", "User registered successfully");
            return response;
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return response;
        }
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", userDetails.getUsername());
            userService.findByUsername(userDetails.getUsername())
                    .ifPresent(user -> response.put("id", user.getId()));
            response.put("authorities", userDetails.getAuthorities());
            response.put("message", "Login successful");

            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Invalid credentials");
            return response;
        }
    }

    @GetMapping("/{id}")
    public org.springframework.http.ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return org.springframework.http.ResponseEntity.ok(user);
        }
        return org.springframework.http.ResponseEntity.notFound().build();
    }
}
