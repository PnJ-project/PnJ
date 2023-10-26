"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import "./google.css";

// 구글로그인 버튼
export default function GoogleLogin() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {/* 로그인시 홈으로 리다이렉트 */}
      <button
        className="googleLogin"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <img
          src="/image/googlelogo.png"
          alt="Google Logo"
          width={20}
          height={20}
          style={{ marginRight: "10px" }}
        />
        <div>Continue with Google</div>
      </button>
    </>
  );
}
