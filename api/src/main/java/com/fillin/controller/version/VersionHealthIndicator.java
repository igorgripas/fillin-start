package com.fillin.controller.version;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class VersionHealthIndicator implements HealthIndicator {

    @Value("${app.version:unknown}")
    private String version;

    @Value("${build.time:unknown}")
    private String buildTime;

    @Override
    public Health health() {
        return Health.up().withDetail("version", version).withDetail("buildTime", buildTime).build();
    }
}
