package com.fillin.exception;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParametersProcessingError extends RuntimeException {
    private List<ErrorMetaData> errors;

    public ParametersProcessingError(String message, List<ErrorMetaData> errors) {
        super(message);
        this.errors = errors;
    }
}
