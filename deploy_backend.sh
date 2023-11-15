#!/bin/bash
EXIST_BLUE=$(docker compose -f docker-compose.blue.yml ps | grep blue)

if [ -z "$EXIST_BLUE" ]; then
    echo "[Up] Blue Up"
    docker compose -f docker-compose.blue.yml up -d backend_blue1 backend_blue2
    docker compose -f docker-compose.green.yml down nginx_green
    docker compose -f docker-compose.blue.yml up -d nginx_blue
    sleep 5
    docker compose -f docker-compose.green.yml down backend_green1 backend_green2
else
    echo "[Up] Green Up"
    docker compose -f docker-compose.green.yml up -d backend_green1 backend_green2
    docker compose -f docker-compose.blue.yml down nginx_blue
    docker compose -f docker-compose.green.yml up -d nginx_green
    sleep 5
    docker compose -f docker-compose.blue.yml down backend_blue1 backend_blue2
fi
