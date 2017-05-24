package com.fillin.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fillin.props.AuthProperties;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Cookie;
import io.restassured.http.Header;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import ua.ardas.jwt.AuthConst;
import ua.ardas.jwt.JwtService;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthTest {
    @LocalServerPort
    private Integer port;
    @Autowired
    private AuthProperties authProperties;
    @Autowired
    private JwtService jwtService;

    @Before
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    @Test
    public void withoutJWTCookieTest() {
        UUID authId = UUID.randomUUID();

        given().
                contentType(ContentType.JSON).
                header(new Header(AuthConst.XSRF_TOKEN_HEADER, authId.toString())).
                when().
                delete("/api/session").
                then().
                statusCode(HttpStatus.SC_UNAUTHORIZED).
                body("message", equalTo("Token is not set"));
    }

    @Test
    public void authOkTest() throws JsonProcessingException {
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
                statusCode(HttpStatus.SC_OK);
    }


    @Test
    public void wrongTokenHeaderTest() throws JsonProcessingException {
        UUID authId = UUID.randomUUID();
        String jwtToken = jwtService.createJwtToken(
                AuthJwtToken.builder()
                        .user_id(1L)
                        .xsrf_token(authId.toString())
                        .build());

        given().
                contentType(ContentType.JSON).
                cookie(new Cookie.Builder(AuthConst.JWT_TOKEN_COOKIE, jwtToken).build()).
                header(new Header(AuthConst.XSRF_TOKEN_HEADER, UUID.randomUUID().toString())).
                when().
                delete("/api/session").
                then().
                statusCode(HttpStatus.SC_UNAUTHORIZED).
                body("message", equalTo("Xsrf token does't match"));
    }

}
