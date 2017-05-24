package com.fillin.base;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fillin.Application;
import com.fillin.auth.AuthJwtToken;
import com.fillin.controller.TestConfig;
import io.restassured.RestAssured;
import io.restassured.http.Cookie;
import io.restassured.http.Header;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ua.ardas.db.checker.DbChecker;
import ua.ardas.jwt.AuthConst;
import ua.ardas.jwt.JwtService;

import java.util.UUID;

@SqlGroup({@Sql(value = {"classpath:test-clean.sql"}), @Sql})
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public abstract class BaseControllerTest {

	protected static final long USER_ID = 1L;
	protected static final UUID authId = UUID.randomUUID();
	protected static final Long SUPER_ADMIN_ROLE = 0L;
	protected static final Long ADMIN_ROLE = 1L;
	protected static final Long COORDINATOR_ROLE = 2L;
	protected static final Long FLP_ROLE = 5L;

	@LocalServerPort
	private Integer port;
	@SpyBean
	protected JwtService jwtService;
	protected String jwtToken;
	protected Cookie ADMIN_RIGHT_AUTHORIZATION_COOKIE;
	protected Cookie AUTHORIZATION_COOKIE_FLP_USER;
	protected Header RIGHT_HEADER;
	protected Header WRONG_JWT_HEADER;
	@Autowired
	protected DbChecker dbChecker;


	@Before
	public void setUp() throws Exception {
		RestAssured.port = port;
		String jwtToken = jwtService.createJwtToken(
				AuthJwtToken.builder()
						.user_id(USER_ID)
						.xsrf_token(authId.toString())
						.build());

		ADMIN_RIGHT_AUTHORIZATION_COOKIE = new Cookie.Builder(AuthConst.JWT_TOKEN_COOKIE, jwtToken).build();
		RIGHT_HEADER = new Header(AuthConst.XSRF_TOKEN_HEADER, authId.toString());
		WRONG_JWT_HEADER = new Header(AuthConst.XSRF_TOKEN_HEADER, UUID.randomUUID().toString());

        jwtToken = jwtService.createJwtToken(
                AuthJwtToken.builder()
                        .user_id(USER_ID)
                        .xsrf_token(authId.toString())
                        .build());
        AUTHORIZATION_COOKIE_FLP_USER = new Cookie.Builder(AuthConst.JWT_TOKEN_COOKIE, jwtToken).build();
	}

	public Cookie getAuthorizationCookie(Long userId, Long roleId) throws JsonProcessingException {
		String jwtToken = jwtService.createJwtToken(
				AuthJwtToken.builder()
						.user_id(userId)
						.xsrf_token(authId.toString())
						.build());

		return new Cookie.Builder(AuthConst.JWT_TOKEN_COOKIE, jwtToken).build();

	}

}