// J의 솔루션 - 추천 디테일 조회
import styled from "styled-components";
import { useRouter } from "next/router";

export default function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return <Container>solution list id: {id}</Container>;
}
const Container = styled.div``
