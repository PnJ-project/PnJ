#!/bin/bash
EXIST_BLUE=$(docker compose -f docker-compose.blue.yml ps | grep blue)

if [ -z "$EXIST_BLUE" ]; then
    echo "[Up] BLUE Up"
    docker compose -f docker-compose.blue.yml up -d
    docker exec nginx cp /app/nginx.blue.conf /etc/nginx/conf.d/default.conf
    docker exec nginx nginx -s reload
    sleep 2
    docker compose -f docker-compose.green.yml down
else

    echo "[Up] GREEN Up"
    docker compose -f docker-compose.green.yml up -d
    docker exec nginx cp /app/nginx.green.conf /etc/nginx/conf.d/default.conf
    docker exec nginx nginx -s reload
    sleep 2
    docker compose -f docker-compose.blue.yml down
fi
