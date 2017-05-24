package com.fillin.controller.version;

import com.fillin.controller.Api;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = Api.ROOT_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
public class VersionController {
	private static final Log LOG = LogFactory.getLog(VersionController.class);


	@Value("${app.version:unknown}")
	private String version;

	@Value("${build.time:unknown}")
	private String buildTime;

	@RequestMapping(value = "version", method = RequestMethod.GET)
	public String getVersion() {
		return this.version;
	}

	@RequestMapping(value = "buildTime", method = RequestMethod.GET)
	public String getTime() {
		return this.buildTime;
	}
}
