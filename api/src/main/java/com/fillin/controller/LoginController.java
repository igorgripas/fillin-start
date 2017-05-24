package com.fillin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fillin.dto.AppToken;
import com.fillin.dto.Credentials;
import com.fillin.props.AuthProperties;
import com.fillin.service.LoginResultContainer;
import com.fillin.service.LoginService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.ardas.jwt.AuthConst;
import ua.ardas.jwt.CookiesUtils;

import javax.servlet.http.HttpServletResponse;

@RefreshScope
@RestController
@RequestMapping(value = Api.ROOT_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
public class LoginController {
    private static final Log LOG = LogFactory.getLog(LoginController.class);
    private static int SECONDS_IN_HOUR = 3600;

    @Autowired
    private AuthProperties authProperties;
    @Autowired
    private LoginService service;
    @Autowired
    private CookiesUtils cookiesUtils;


    @PostMapping(Api.SESSION_CREDENTIALS)
    public AppToken login(@RequestBody final Credentials credentials, HttpServletResponse response) throws JsonProcessingException {
        LoginResultContainer container = service.login(credentials);
        updateSecurityCookies(response, container);
        return container.getAppToken();
    }

    private void updateSecurityCookies(HttpServletResponse response, LoginResultContainer container) {
        response.addCookie(cookiesUtils.createCookie(AuthConst.JWT_TOKEN_COOKIE, container.getJwtToken(), true,
                authProperties.getTokenExpireHours() * SECONDS_IN_HOUR));
    }

    @DeleteMapping(Api.SESSION)
    public ResponseEntity logout(HttpServletResponse response) {
        response.addCookie(cookiesUtils.createCookieToDelete(AuthConst.JWT_TOKEN_COOKIE, "delete", true));
        return new ResponseEntity(HttpStatus.OK);
    }
}
