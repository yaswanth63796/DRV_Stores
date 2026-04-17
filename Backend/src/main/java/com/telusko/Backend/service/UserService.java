package com.telusko.Backend.service;

import com.telusko.Backend.entity.User;
import com.telusko.Backend.entity.UserRole;
import com.telusko.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(UserRole.CUSTOMER);
        }
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        return userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByUsername(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + identifier));
    }
}
