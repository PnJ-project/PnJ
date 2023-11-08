import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import styled from 'styled-components';

const MyToolbar: React.FC<ToolbarProps> = ({
  date,
  onNavigate,
  children,
}) => {
  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };



  return (
    <Container className="my-custom-toolbar">
      <button type="button" onClick={() => navigate('TODAY')}>
        오늘
      </button>
      <div>
        <button className="movingbtn" type="button" onClick={() => navigate('PREV')}>
          {'<'}
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        <button className="movingbtn" type="button" onClick={() => navigate('NEXT')}>
          {'>'}
        </button>
      </div>


      {/* <span>{label}</span> */}
      {children}
    </Container>
  );
};

export default MyToolbar;


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  button{
    padding: 5px;
    height: 14px;
    border-radius: 5px;
    font-size:11px;
    border: 2px solid #EBEBF0;
    background: #FFF;
  }
  .movingbtn{
    border: 0;
  }
`