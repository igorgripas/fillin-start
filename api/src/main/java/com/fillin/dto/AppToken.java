package com.fillin.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.UUID;

@Data
@Getter
@Builder
public class AppToken {
    private Long user_id;
    private String xsrf_token;
}
