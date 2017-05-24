package com.fillin.service;

import com.fillin.dto.AppToken;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginResultContainer {

	private AppToken appToken;
	private String jwtToken;
}