package com.fillin.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AuthConfig extends WebSecurityConfigurerAdapter {

	@Value("${auth.testMode}")
	private Boolean testMode;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		addCorsFilterForTestEnv(http);

		http.csrf().disable();
	}

	private void addCorsFilterForTestEnv(HttpSecurity http) throws Exception {
		if (testMode) {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowCredentials(true);
            config.addAllowedOrigin("http://localhost:8095");
			config.addAllowedHeader("*");
			config.addAllowedMethod("*");
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**", config);
			http.cors().configurationSource(source);
		}
	}
}
