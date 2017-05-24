package com.fillin.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fillin.auth.AuthJwtToken;
import com.fillin.auth.PasswordDecoder;
import com.fillin.auth.XsrfTokenGenerator;
import com.fillin.dto.AppToken;
import com.fillin.dto.Credentials;
import com.fillin.entity.User;
import com.fillin.entity.UserRepository;
import com.fillin.exception.AuthenticationException;
import com.fillin.exception.ParametersProcessingErrorDtoFactory;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.ardas.jwt.JwtService;

import java.util.List;
import java.util.Objects;


@Service
public class LoginService {
    private static final Log LOG = LogFactory.getLog(LoginService.class);

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordDecoder passwordDecoder;
    @Autowired
    private XsrfTokenGenerator xsrfTokenGenerator;
    @Autowired
    private ParametersProcessingErrorDtoFactory parametersProcessingErrorDtoFactory;


    public LoginResultContainer login(Credentials credentials) throws JsonProcessingException {
        User user = getUserByCredentials(credentials);

        if (null == user) {
            throw new AuthenticationException("Unknown user");
        }

        AuthJwtToken authToken = new AuthJwtToken().builder()
                                    .user_id(user.getUserId())
                                    .xsrf_token(xsrfTokenGenerator.generateXsrfToken())
                                    .build();

        AppToken userDto = AppToken.builder()
                .user_id(user.getUserId())
                .xsrf_token(authToken.getXsrfToken())
                .build();

        return new LoginResultContainer(userDto, jwtService.createJwtToken(authToken));
    }


    public User getUserByCredentials(Credentials credentials) {
        User user = userRepository.findByEmailIgnoreCase(credentials.getEmail());

        if (Objects.isNull(user)) {
            if (LOG.isDebugEnabled()) {
                LOG.debug(String.format("User with login '%s' doesn't exist", credentials.getEmail()));
            }
            return null;
        }

        String passwordHash = passwordDecoder.encodePassword(credentials.getPassword(), user.getSalt());

        if (!passwordHash.equals(user.getPasswordHash())) {
            if (LOG.isDebugEnabled()) {
                LOG.debug(String.format("Password doesn't match for user: '%s'. passwordHash: '%s'", credentials.getEmail(),
                        passwordHash));
            }
            return null;
        }
        return user;
    }
}