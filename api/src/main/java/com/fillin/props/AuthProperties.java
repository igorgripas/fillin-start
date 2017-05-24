package com.fillin.props;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("auth")
public class AuthProperties {

    private String privateKeyPath;
    private String publicKeyPath;
    private int tokenExpireHours;
    private String domain;
    private String cookiesPath;
    private boolean cookiesSecure;
}
