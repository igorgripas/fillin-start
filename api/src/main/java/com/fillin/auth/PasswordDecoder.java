package com.fillin.auth;

import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;

@Controller
public class PasswordDecoder extends ShaPasswordEncoder {

    public PasswordDecoder() {
        super(256);
    }

    @Override
    protected String mergePasswordAndSalt(String password, Object salt, boolean strict) {
        return password + salt;
    }
}
