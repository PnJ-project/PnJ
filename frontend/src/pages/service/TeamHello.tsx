import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./TeamHello.css";
import teamP from '../../../public/image/teamP.svg';
import styled from "styled-components";
import Team from './Team';
export default function teamhello() {
  const [showHello, setShowHello] = useState(true);

  // 3초 후에 'Hello.' 텍스트를 숨기고 'Our Team' 페이지를 보여줌
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHello(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
      
      <div className="wrap">
          <Container>
        
      {showHello ? (
        <motion.div
          className="box"
          animate={{ scale: [1, 1.5, 1.1] }}
          transition={{ duration: 3, times: [0, 0.2, 1] }}
        >
          안녕하세요! <br />저희 팀을 소개합니다!
          <ImgP src={teamP} />
        </motion.div>
      ) : (
        <Team />
      )}
    </Container>
    </div>
  );
}

const ImgP = styled.img`
width: 140px;
height: 140px;   
margin-left: 10px;
`

const Container = styled.div`
display:flex ;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;

`