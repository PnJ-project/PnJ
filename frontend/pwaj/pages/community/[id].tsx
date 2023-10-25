// 커뮤니티 - detail 조회
import { useRouter } from "next/router";


export default function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return <>community id: {id}</>;
}

