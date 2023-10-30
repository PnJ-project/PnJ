// import React from 'react';
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import Solution from "./pages/Solution";
import SolutionList from "./pages/SolutionList";
import Notfound from "./pages/service/404";
import About from "./pages/service/About";
import Contact from "./pages/service/Contact";
import Team from "./pages/service/Team";
import PageManager from "./pages/PageManager";
import TestManager from "./pages/test/TestManager";
export default function App() {
  return (
    <>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Main />} />
        {/* 메인 서비스 */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/community" element={<Community />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/solutionlist" element={<SolutionList />} />
        {/* 회원관리 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* 기타 */}
        <Route path="*" element={<Notfound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        {/* 개발자용 */}
        <Route path="/pm" element={<PageManager />} />
        <Route path="/tm" element={<TestManager />} />
      </Routes>
    </>
  );
}
