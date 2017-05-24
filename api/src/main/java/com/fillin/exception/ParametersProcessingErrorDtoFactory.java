package com.fillin.exception;

import com.google.common.collect.Lists;
import org.springframework.stereotype.Component;

@Component
public class ParametersProcessingErrorDtoFactory {

    public ParametersProcessingError createError(String entity, String field, String message, String debugMessage) {
        return new ParametersProcessingError(debugMessage, Lists.newArrayList(buildErrorMetaData(entity, field, message)));
    }

    public ErrorMetaData buildErrorMetaData(String entity, String field, String message) {
        return ErrorMetaData.builder()
                .entity(entity)
                .field(field)
                .message(message).build();
    }
}