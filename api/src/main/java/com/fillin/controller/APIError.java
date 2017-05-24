package com.fillin.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class APIError {
	public static final String ERROR_SEPARATOR = "; ";
	private String message;

	public APIError() {
	}

	public APIError(String message) {
		this.message = message;
	}

	public APIError(BindingResult bindingResult) {
		List<String> errors = new ArrayList<String>();
		for (FieldError fieldError : bindingResult.getFieldErrors()) {
			errors.add(fieldError.getDefaultMessage());
		}
		Collections.sort(errors);
		message = StringUtils.join(errors, ERROR_SEPARATOR);
	}

	public String getMessage() {
		return message;
	}
}
