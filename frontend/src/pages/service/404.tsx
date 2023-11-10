import errorP from '../../../public/image/errorP.svg';
import styled from 'styled-components';

export default function notfound() {
  return (
    <>
      <Container>
        <ImgP src={errorP} />
        <TextContainer>
          <Title>404 ERROR</Title>
          <Detail>
            존재하지 않는 주소를 입력하였거나, <br />요청하신 페이지 주소가 변경,
            삭제되어 찾을 수 없습니다.
          </Detail>
          <GoToMain href="/">메인으로 돌아가기 -></GoToMain>
        </TextContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

`;

const ImgP = styled.img`
  width: 400px;
  height: 300px;
  display: flex;
  margin-right: 40px;
`;

const Title = styled.p`
  color: #000;
  font-size: 60px;
  font-style: bold;
  font-weight: 400;
  line-height: normal;

`;

const Detail = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top:20px;
`;

const GoToMain = styled.a`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  margin-top:20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

