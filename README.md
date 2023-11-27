# P 와 J

일정을 계획적으로 설계하기에 어려움이 있는 P와 일정 설계에 편리함을 원하는 J를 위한 캘린더 서비스 P 와 J 입니다.

## 📅 개요
**개발 기간** : 2023.10.09 ~ 2023.11.17 (총 6주)

**기능**
- OAuth2.0을 통한 Google Login
- 서비스 내 캘린더로 Google Calendar 연동 일정 관리
- 시간 정보를 등록하지 않은 Todo 일정 관리
- 일상적인 대화, 요약된 글 등의 형식으로 일정을 등록
- 마이크 음성을 통해 일정을 등록
- 내 일정과 유사한 정보 추천

## 💡서비스 소개

### P 와 J

> 일정을 계획적으로 설계하기 어려운 P
> 
> 일정 설계에 편리함을 원하는 J
> 
> 모두에게 쉽고 빠른 일정 등록과 유사한 일정을 추천합니다.

<br/>

### 배포 URL
> https://k9a601.p.ssafy.io/demo

<br/>

### 서비스 화면

**초기 화면**
![image-1.png](./images/image-1.png)

**기능 안내 튜토리얼**
![image-2.png](./images/image-2.png)

**메인 캘린더**
![image.png](./images/image.png)

**일정 기반 정보 추천 - 리스트**
![추천 갤러리.gif](./images/gif-2.gif)

**일정 기반 정보 추천 - 갤러리**
![추천 카테고리.gif](./images/gif-1.gif)

## 📋기술 스택

**💻 FRONTEND**

**Environment**

<img src="https://img.shields.io/badge/pnpm-8.10.2-F69220?style=for-the-badge&logo=pnpm&logoColor=black"> 
<img src="https://img.shields.io/badge/node.js-18.17.1-339933?style=for-the-badge&logo=Node.js&logoColor=white">

<img src="https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/typescript-5.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

**Dependency**

<img src="https://img.shields.io/badge/react big calendar-000000?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

<br/>

**💻 BACKEND**

**Environment**

<img src="https://img.shields.io/badge/spring boot-2.7.16-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/JDK-11.0.20-6DB33F?style=for-the-badge&logo=openjdk&logoColor=white">
<img src="https://img.shields.io/badge/gradle-6DB33F?style=for-the-badge&logo=gradle&logoColor=white">

**Dependency**

<img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/jpa-59666C?style=for-the-badge&logo=hibernate&logoColor=white">

**DB**

<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white">

<br/>

**💾 DATA**

**Environment**

<img src="https://img.shields.io/badge/python-3.8-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=mariadb&logoColor=white">

<br/>

**📠 INFRA**

<img src="https://img.shields.io/badge/ec2-ff9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-d24939?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ed?style=for-the-badge&logo=docker&logoColor=white">

## 역할 분담

| <center>김혜진</center> | <center>조재웅</center> | <center>임대영</center> | <center>조준하</center> | <center>박승희</center> | <center>이성원</center> |
| :-: | :-: | :-: | :-: | :-: | :-: 
| :crown: / DATA | BE / INFRA | BE | FE | FE | FE / DATA |
| 간편 일정 등록, 일정 기반 유사 정보 추천 알고리즘 | CI/CD 구축, 무중단 배포 | OAuth2.0, 캘린더 API | API 연동,소셜 로그인, Todo , 추천 갤러리 페이지 | Redux, 캘린더 동작, css, Drag & Drop | 데이터 분석, STT, Carousel 슬라이드 |

