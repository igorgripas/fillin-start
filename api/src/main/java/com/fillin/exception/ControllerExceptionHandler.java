package com.fillin.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerExceptionHandler {
	private static final Log LOG = LogFactory.getLog(ControllerExceptionHandler.class);

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public void handleAuthenticationException(AuthenticationException exception) {
	}

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.FORBIDDEN)
	public void handleSecurityException(SecurityException exception) {
		LOG.warn("Security exception", exception);
	}

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.FORBIDDEN)
	public void handleForbiddenActionException(ForbiddenException exception) {
		LOG.warn(exception.getMessage());
	}

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public void handleEntityNotFoundException(EntityNotFoundException exception) {
		LOG.warn(exception.getMessage());
	}

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
	public ResponseEntity<String> handleParametersProcessingError(ParametersProcessingError exception) {
        return new ResponseEntity<>(new JSONObject()
                .put("message", exception.getMessage())
                .put("errors", exception.getErrors())
                .toString(), HttpStatus.UNPROCESSABLE_ENTITY);
	}
}