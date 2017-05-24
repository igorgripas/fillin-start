package com.fillin.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import ua.ardas.jwt.JwtData;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthJwtToken implements JwtData {

    private Long user_id;
    private String xsrf_token;

    @Override
    @JsonIgnore
    public String getXsrfToken() {
        return xsrf_token;
    }
}