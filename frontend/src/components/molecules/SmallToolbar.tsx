import React from "react";
import { ToolbarProps } from "react-big-calendar";
import styled from "styled-components";

const MyToolbar: React.FC<ToolbarProps> = ({ date, onNavigate, children }) => {
  const navigate = (action: "PREV" | "NEXT" | "TODAY") => {
    onNavigate(action);
  };

  return (
    <Container className="my-custom-toolbar">
      <button type="button" onClick={() => navigate("TODAY")}>
        오늘
      </button>
      <div>
        <button
          className="movingbtn"
          type="button"
          onClick={() => navigate("PREV")}
        >
          {"<"}
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button
          className="movingbtn"
          type="button"
          onClick={() => navigate("NEXT")}
        >
          {">"}
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
  font-family: SUITE-Regular;
  button {
    font-family: SUITE-Regular;
    padding: 5px;
    height: 14px;
    border-radius: 5px;
    font-size: 9px;
    border: 2px solid #ebebf0;
    background: #fff;
    margin: auto;
    margin-left: 4px;
  }
  .movingbtn {
    border: 0;
  }
`;
