package com.fillin.auth;

import org.springframework.web.filter.GenericFilterBean;
import ua.ardas.jwt.CookiesUtils;
import ua.ardas.jwt.JwtAuthFilter;
import ua.ardas.jwt.JwtService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;
import java.util.Collection;

public class JwtFilter extends GenericFilterBean {

    private final JwtAuthFilter jwtAuthFilter;


    public JwtFilter(Collection<String> excludeUrls, JwtService jwtService, CookiesUtils cookiesUtils) {
        jwtAuthFilter = new JwtAuthFilter(excludeUrls, jwtService, cookiesUtils, AuthJwtToken.class);
    }

    @Override
    public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain)
            throws IOException, ServletException {
        jwtAuthFilter.filterRequest(req, res, chain);
    }
}