// J의 솔루션 - 추천 디테일 조회
import { useRouter } from "next/router";

export default function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return <div>solution list id: {id}</div>;
}
