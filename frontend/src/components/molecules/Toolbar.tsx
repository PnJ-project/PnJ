import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import styled from 'styled-components';

const MyToolbar: React.FC<ToolbarProps> = ({
  label,
  onNavigate,
  onView,
  children,
}) => {
  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };

  const viewnavigate = (action: 'month' | 'week' | 'day') => {
    onView(action);
    console.log(action)
  };

  return (
    <Container className="my-custom-toolbar">
      <button className="todaybtn" type="button" onClick={() => navigate('TODAY')}>
        오늘
      </button>
      <div className="center-btns">
        <button className="movingbtn" type="button" onClick={() => navigate('PREV')}>
          {'<'}
        </button>
        <span className="rbc-toolbar-label">{ label }</span>
        <button className="movingbtn" type="button" onClick={() => navigate('NEXT')}>
        {'>'}
        </button>
      </div>
      <div className="right-btns">
        <button type="button" onClick={() => viewnavigate('month')}>
          월
        </button>
        <button type="button" onClick={() => viewnavigate('week')}>
          주
        </button>
        <button type="button" onClick={() => viewnavigate('day')}>
          일
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
  //margin 위 오른쪽 아래 왼쪽
  margin: 4px 8px;
  justify-content: space-between;
  text-align: center;
  font-family:SUITE-Regular;
  font-weight: 400;
  button{
    font-family:SUITE-Regular;
    font-weight: 100;
    border-radius: 5px;
    border: 2px solid #EBEBF0;
    background: #FFF;
  }
  .movingbtn{
    border: 0;
  }
`