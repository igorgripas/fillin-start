#!/bin/bash

containerId=`cat /proc/self/cgroup | grep -o  -e "docker-.*.scope" | head -n 1 | sed "s/docker-\(.*\).scope/\\1/"`
if [ -z "$containerId" ]; then echo "Try second way to find containerId"; containerId=$(cat /proc/self/cgroup | grep "docker" | sed s/\\//\\n/g | tail -1); fi

echo "containerId: " $containerId
shortContainerId=`echo $containerId | cut -c 1-12`
echo "shortContainerId: " $shortContainerId

export DOCKER_CONTAINER_ID=$shortContainerId
[[ ! -f /ip.txt ]] || export `cat /ip.txt`

echo "=========env"
set


if [ -z "$LOGSTASH_HOST" ]; then echo "LOGSTASH_HOST is UNKNOWN"; LOGSTASH_HOST="localhost";fi
if [ -z "$LOGSTASH_PORT" ]; then echo "Set default LOGSTASH_PORT"; LOGSTASH_PORT=5006; fi
if [ -z "$DOCKER_HOST" ]; then echo "DOCKER_HOST is UNKNOWN"; DOCKER_HOST="UNKNOWN"; fi
if [ -z "$APPNAME" ]; then echo "APPNAME is UNKNOWN"; APPNAME="UNKNOWN"; fi
if [ -z "$ENV" ]; then echo "ENV is UNKNOWN"; ENV="UNKNOWN"; fi
if [ -z "$DOCKER_CONTAINER_ID" ]; then echo "DOCKER_CONTAINER_ID is UNKNOWN"; DOCKER_CONTAINER_ID="UNKNOWN"; fi

java \
    $JVM_MEMORY_OPTS \
    -Djava.security.egd=file:/dev/./urandom \
    -Dlogstash_host=$LOGSTASH_HOST \
    -Dlogstash_port=$LOGSTASH_PORT \
    -Ddocker_host=$DOCKER_HOST \
    -Dappname=$APPNAME \
    -Denv=$ENV \
    -Dcontainer_id=$DOCKER_CONTAINER_ID \
    -Dlogging.config=/logback.xml \
    -jar /app.jar
