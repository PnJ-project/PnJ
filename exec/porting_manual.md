# 요구사항
## docker 및 플러그인 설치
1. 도커 설치
```
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin
# 일반유저에게 도커 권한 부여합니다.
sudo chmod 777 /var/run/docker.sock
```

2. docker compose plugin 설치
도커 컴포즈는 수동 설치를 진행해주었습니다. 젠킨스 컨테이너에서 도커 컴포즈를 마운팅해서 사용하기 위함입니다.
```
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
# 일반유저에게 도커 컴포즈 권한 부여합니다.
sudo chmod +777 /usr/local/lib/docker/cli-plugins/docker-compose
```

## nginx 및 certbot
1. cerbot을 통해 ssl 인증서 받아오기
```
# Certbot 초기 발급
docker run -it --rm --name certbot \
  -p 80:80 \
  -v '/etc/letsencrypt:/etc/letsencrypt' \
  -v '/var/lib/letsencrypt:/var/lib/letsencrypt' \
  certbot/certbot certonly -d '[도메인주소]' --standalone \
  --server https://acme-v02.api.letsencrypt.org/directory

# Certbot 재발급
docker run -it --rm --name certbot \
  -p 80:80 \
  -v '/etc/letsencrypt:/etc/letsencrypt' \
  -v '/var/lib/letsencrypt:/var/lib/letsencrypt' \
  certbot/certbot renew --standalone \
  --server https://acme-v02.api.letsencrypt.org/directory
``` 
2. options-ssl-nginx.conf 추가
- 디렉터리로 이동
```
# 해당 폴더로 이동
cd /etc/letsencrypt/

# 해당파일 만들기
sudo vi options-ssl-nginx.conf
```

- 파일에 붙여넣기
```
ssl_session_cache shared:le_nginx_SSL:1m;
ssl_session_timeout 1440m;

ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
```

3. 디피 헬만 파라미터 키 생성
```
sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
```

4. nginx 설정 파일들 추가
- 설정 파일 위치로 이동
```
# repository 루트 디렉토리에서 실행
cd infra/nginx/conf.d
sudo vim nginx.blue.conf
```

- 설정파일 추가하기
```
server {
        listen 80;
        server_name {도메인 이름};
        server_tokens off;

        location / {
                return 308 https://$server_name$request_uri;
        }

}

server {
        listen 443 ssl;
        server_name {도메인 이름};
        server_tokens off;
        access_log off;

        ssl_certificate /etc/letsencrypt/live/{도메인 이름}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/{도메인 이름}/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

        location / {
                proxy_pass http://{도메인 이름}:{frontend port}/;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $server_name;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_redirect off;
        }

        location /api/ {
                proxy_pass http://backend/api/;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $server_name;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_redirect off;
        }

        location /trans/ {
                include uwsgi_params;
                proxy_pass http://flask/trans/;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $server_name;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_redirect off;
        }
}

upstream backend {
        server {도메인 이름}:{백엔드1 포트}/;
        server {도메인 이름}:{백엔드2 포트}/;

        server {도메인 이름}:{백엔드3 포트}/ down;
        server {도메인 이름}:{백엔드4 포트}/ down;
}

upstream flask {
        server {도메인 이름}:{플라스크1 포트}/;
        server {도메인 이름}:{플라스크2 포트}/;
}
```
- 블루그린 배포도 적용하고자 한다면, upstream 서버를 다음과 같이 적용한다.
    - 파일 추가 
    ```
    sudo vim nginx.blue.conf
    ```
    - nginx.blue.conf 중 backend upstream 수정해서 적용
    ```
    upstream backend {
            server {도메인 이름}:{백엔드1 포트}/ down;
            server {도메인 이름}:{백엔드2 포트}/ down;

            server {도메인 이름}:{백엔드3 포트}/;
            server {도메인 이름}:{백엔드4 포트}/;
    }
    ```

# 도커 이미지 빌드
## frontend
1. frontend 디렉토리로 이동하기
repository root directory에서 시작하겠습니다.
```
cd frontend
sudo vi .env.production
```
2. 환경변수 추가
```
VITE_APP_GOOGLE_CLIENT_ID=
VITE_APP_GOOGLE_CLIENT_SECRET=
VITE_APP_GOOGLE_CLIENT_ID2=
VITE_APP_GOOGLE_CLIENT_SECRET2=

# BackEnd
VITE_APP_BACKEND_SERVER={도메인 주소}
VITE_APP_BACKEND_SERVER_LIVE={도메인 주소}
# flask
VITE_APP_FLASK_SERVER={도메인 주소}

# TTS
VITE_APP_VITO_CLIENT_ID={구글 tts id}
VITE_APP_VITO_CLIENT_SECRET={구글 tts pw}
```
3. frontend 도커 이미지 빌드
```
docker build -t frontend .
```

## backend
- repository root 디렉토리에서 backend 디렉토리 시작하겠습니다.
```
cd backend
```
- backend application 설정들 붙여넣기
```
cp -r ../exec/resources src/main/resources
```
- 빌드
```
docker build -t backend .
```

## flask
- repository root 디렉토리에서 data 디렉토리로 이동
```
cd data
```
- 빌드
```
docker build -t flask .
```

# 배포
repository root 에서 시작
## 설정파일 추가
- repository root에 추가
```
sudo vi .env
```
- 포트 및 비밀번호 설정해서 붙여넣기
```
JENKINS_USER=
JENKINS_PORT=

FRONTEND_PORT=

BACKEND_PORT_BLUE1=
BACKEND_PORT_BLUE2=
BACKEND_PORT_GREEN1=
BACKEND_PORT_GREEN2=

FLASK_PORT1=
FLASK_PORT2=

MARIADB_ROOT_PW=
MARIADB_USER=
MARIADB_PW=

EMAIL=
DOMAIN=
```

## 순차적으로 배포
1. MariaDB
```
docker compose up mariadb
```

2. Frontend
```
docker run -d --name frontend -p ${FRONTEND_PORT}:5173 frontend:latest
```

3. Backend
```
docker compose -f docker-compose.blue.yml up -d
```

4. Flask
```
docker compose -f docker-compose.flask.yml up -d
```

5. nginx
```
docker compose up nginx -d
docker exec nginx cp /app/nginx.blue.conf /etc/nginx/conf.d/default.conf
docker exec nginx nginx -s reload
```
