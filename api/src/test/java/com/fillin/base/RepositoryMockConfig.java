package com.fillin.base;


import com.fillin.entity.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import static org.mockito.Mockito.mock;

public class RepositoryMockConfig {

    @Bean
    @Primary
    public UserRepository register() {
        return mock(UserRepository.class);
    }
}
