// 커뮤니티 - detail 조회
import { useRouter } from "next/router";
import styled from "styled-components";


export default function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return <Container>community id: {id}</Container>;
}

const Container = styled.div``
