package com.fillin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fillin.auth.AuthJwtToken;
import com.fillin.base.BaseControllerTest;
import io.restassured.http.ContentType;
import io.restassured.http.Cookie;
import io.restassured.http.Header;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ua.ardas.jwt.AuthConst;
import ua.ardas.jwt.JwtService;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.notNullValue;

public class LoginControllerTest extends BaseControllerTest {

    @Autowired
    private JwtService jwtService;


    @Test
    public void testLogin() throws Exception {
        String res =
                given().
                        contentType(ContentType.JSON).
                        body("{\"email\": \"test@test.com\", \"password\": \"secret\"}").
                        when().
                        post("/api/session/credentials").
                        then().
                        statusCode(HttpStatus.SC_OK).
                        cookie(AuthConst.JWT_TOKEN_COOKIE).
                        body("xsrf_token", notNullValue())
                        .extract().asString();
        System.out.println("res " + res);
    }

    @Test
    public void testLoginIncorrectCredentials() {
        given().
                contentType(ContentType.JSON).
                body("{\"email\": \"test@wrong\", \"password\": \"secret\"}").
                when().
                post("/api/session/credentials").
                then().
                statusCode(HttpStatus.SC_UNAUTHORIZED);

        given().
                contentType(ContentType.JSON).
                body("{\"email\": \"test@test.te\", \"password\": \"wrong\"}").
                when().
                post("/api/session/credentials").
                then().
                statusCode(HttpStatus.SC_UNAUTHORIZED);

    }

    @Test
    public void testLoginWithoutCredentials() throws Exception {
        given().
                contentType(ContentType.JSON).
                when().
                post("/api/session/credentials").
                then().
                statusCode(HttpStatus.SC_BAD_REQUEST);
    }

    @Test
    public void logoutOk() throws JsonProcessingException {
        UUID authId = UUID.randomUUID();
        String jwtToken = jwtService.createJwtToken(
                AuthJwtToken.builder()
                        .user_id(1L)
                        .xsrf_token(authId.toString())
                        .build());

        given().
                contentType(ContentType.JSON).
                cookie(new Cookie.Builder(AuthConst.JWT_TOKEN_COOKIE, jwtToken).build()).
                header(new Header(AuthConst.XSRF_TOKEN_HEADER, authId.toString())).
                when().
                delete("/api/session").
                then().
                statusCode(HttpStatus.SC_OK).
                cookie(AuthConst.JWT_TOKEN_COOKIE);

    }
}