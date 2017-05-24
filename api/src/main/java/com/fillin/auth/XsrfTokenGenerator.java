package com.fillin.auth;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class XsrfTokenGenerator {

    public String generateXsrfToken() {
        return UUID.randomUUID().toString();
    }
}
