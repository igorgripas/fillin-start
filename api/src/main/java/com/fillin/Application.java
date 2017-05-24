package com.fillin;

import com.fillin.auth.JwtFilter;
import com.fillin.auth.RsaKeyStorageBuilder;
import com.fillin.controller.Api;
import com.fillin.props.AuthProperties;
import com.google.common.collect.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import ua.ardas.jwt.CookiesUtils;
import ua.ardas.jwt.JwtService;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashSet;

@SpringBootApplication
@EnableConfigurationProperties({AuthProperties.class})
public class Application {

    @Autowired
    private AuthProperties authProperties;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public FilterRegistrationBean jwtFilter(JwtService jwtService, CookiesUtils cookiesUtils) {
        final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        HashSet<String> excludePathes = Sets.newHashSet(
                Api.ROOT_PATH + Api.SESSION_CREDENTIALS,
                Api.ROOT_PATH + "/version");

        registrationBean.setFilter(new JwtFilter(excludePathes, jwtService, cookiesUtils));
        registrationBean.addUrlPatterns(Api.ROOT_PATH + "/*");

        return registrationBean;
    }

    @Bean
    public JwtService jwtService() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        return new JwtService(new RsaKeyStorageBuilder()
                .privateKey(authProperties.getPrivateKeyPath())
                .publicKey(authProperties.getPublicKeyPath())
                .build(), authProperties.getTokenExpireHours());
    }

    @Bean
    public CookiesUtils cookiesUtils(){
        return new CookiesUtils(authProperties.getDomain(), authProperties.getCookiesPath(),
                authProperties.isCookiesSecure());
    }

    @Bean
    public Filter restRequestsLoggingFilter() {
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter() {
            @Override
            protected boolean shouldLog(HttpServletRequest request) {
                if (request.getRequestURI().contains("password")) {
                    return false;
                }
                return super.shouldLog(request);
            }

            @Override
            protected void beforeRequest(HttpServletRequest request, String message) {
                if (message.contains("password")) {
                    return;
                }
                super.beforeRequest(request, message);
            }

            @Override
            protected void afterRequest(HttpServletRequest request, String message) {
                if (message.contains("password")) {
                    return;
                }
                super.afterRequest(request, message);
            }
        };

        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setIncludeClientInfo(true);
        filter.setMaxPayloadLength(5120);
        return filter;
    }
}
