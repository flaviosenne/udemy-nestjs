package com.micro.auth.service;

import com.micro.auth.dto.LoginDto;
import com.micro.auth.dto.RegisterDto;
import com.micro.auth.dto.ResponseLoginDto;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public void register(RegisterDto dto){

    }

    public ResponseLoginDto login(LoginDto dto){
        return new ResponseLoginDto("token");
    }

}
