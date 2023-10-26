// 홈페이지
import React from "react";
import axios from "axios";
import plogo from '../src/assets/main.svg'
import Image from "next/image";
import styles from "./index.module.css"
import UseDemo from "@/components/atoms/useDemo";
import GoogleLogin from "@/components/atoms/googleLogin";

export default function index() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textdiv}>
          <div className={styles.title}>
            <div><span className={styles.span}>음성과 텍스트</span>로</div>
            혁신적인 일정관리를 경험해보세요
          </div>
          <div className={styles.content}>innovatory Experience schedule management</div>
          <div className={styles.btns}>
            <UseDemo />
            <GoogleLogin />
          </div>
        </div>
        <Image src={plogo} alt="PnJ LOGO" className={styles.LogoImg} />
      </div>
    </>
  );
}

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
