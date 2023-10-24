// 개발자용 모든 페이지 링크 생성
import Link from "next/link";
import styled from "styled-components";

const routes = [
  { path: "/", name: "홈페이지" },
  { path: "/demo", name: "데모" },
  { path: "/login", name: "로그인" },
  { path: "/signup", name: "가입하기" },
  { path: "/mypage", name: "마이페이지" },
  { path: "/solution", name: "솔루션" },
  { path: "/solution/list", name: "솔루션 리스트" },
  { path: "/community", name: "커뮤니티" },
  { path: "/service/about", name: "서비스 소개" },
  { path: "/service/team", name: "팀 소개" },
  { path: "/service/contact", name: "문의하기" },
  { path: "/test", name: "테스트 페이지" },
];

const PMPage = () => {
  return (
    <Container>
      <h1>pm</h1>
      <div>
        {routes.map((route, index) => (
          <Link key={index} href={route.path}>
            <RouterName>{route.name}</RouterName>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default PMPage;

const Container = styled.div``
const RouterName = styled.div`
font-size:18px;
margin-bottom: 10px;
`