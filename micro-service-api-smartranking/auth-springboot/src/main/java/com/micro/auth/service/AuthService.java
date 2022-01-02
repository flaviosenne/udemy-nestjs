package com.micro.auth.service;

import com.micro.auth.dto.RegisterDto;
import com.micro.auth.entity.User;
import com.micro.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;


    public User register(RegisterDto dto){

        Optional<User> existUser = repository.findByEmail(dto.getEmail());

        if(existUser.isPresent()) return null;

        String hash = this.encodePassword(dto.getPassword());

        User user = new User(null, dto.getName(), dto.getEmail(), hash, 1, new Date());

        return repository.save(user);
    }

    public boolean passwordMatch(String hash, String password){
        return new BCryptPasswordEncoder().matches(password, hash);
    }

    public String encodePassword(String password){
        return new BCryptPasswordEncoder().encode(password);
    }
}
