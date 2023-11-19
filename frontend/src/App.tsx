// 라우터
import { Route, Routes } from "react-router-dom";
// 페이지
import Demo from "./pages/Demo";
import Calendar from "./pages/Main";
import Notfound from "./pages/service/404";
import About from "./pages/service/About";
import Contact from "./pages/service/Contact";
import TeamHello from "./pages/service/TeamHello";
import PageManager from "./pages/PageManager";
import TestManager from "./pages/test/TestManager";


export default function App() {
  // 로그인 여부
  return (
    <>
      <Routes>
        {/* 홈 */}
        <Route path="/demo" element={<Demo />} />
        {/* 메인 서비스 */}
        <Route path="/" element={<Calendar />} />
        {/* 기타 */}
        <Route path="*" element={<Notfound />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<TeamHello />} />
        {/* 개발자용 */}
        <Route path="/pm" element={<PageManager />} />
        <Route path="/tm" element={<TestManager />} />
      </Routes>
    </>
  );
}
