// import React from 'react';
import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import Main from "./pages/Main";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import Solution from "./pages/Solution";
import SolutionList from "./pages/SolutionList";
export default function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/community" element={<Community />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/solutionlist" element={<SolutionList />} />
    </Routes>
    </>
  );
}