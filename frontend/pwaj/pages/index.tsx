// 홈페이지
import React from "react";
import styled from "styled-components";
import axios from "axios";

export default function index() {
  return (
    <Container>
      <h1>홈페이지</h1>
    </Container>
  );
}

const Container = styled.div`
`
// SSR - 초기 데이터 불러오기
export async function getServerSideProps() {
  try {
    const response = await axios.get(""); // 요청할 엔드포인트에 맞게 수정하세요.
    const results = response.data; // 받아온 데이터를 results에 할당합니다.

    return {
      props: { results }, // props를 통해 페이지에 데이터를 전달합니다.
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { results: null }, // 에러가 발생한 경우에도 props를 전달합니다.
    };
  }
}
