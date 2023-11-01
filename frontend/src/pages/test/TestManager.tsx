import React, { useState } from "react";
import Components from "./Components";
import Csrapi from "./CsrApi";
import Login from "./GoogleLogin";
import Logout from "./Logout";

type ComponentType = React.FC<unknown>;

interface Components {
  [key: string]: ComponentType;
}

const TestManager: React.FC = () => {
  const components: Components = {
    Components: Components,
    Csrapi: Csrapi,
    Login: Login,
    Logout: Logout,
    // 다른 컴포넌트들을 원하는 만큼 추가할 수 있습니다.
  };

  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(
    null
  );

  const handleComponentClick = (componentName: string): void => {
    const Component: ComponentType | undefined = components[componentName];
    if (Component) {
      setCurrentComponent(<Component />);
    }
  };

  return (
    <>
      <h1>TestManager</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          border: "1px solid black",
        }}
      >
        {Object.keys(components).map((componentName: string, index: number) => (
          <div key={index}>
            <h3
              onClick={() => handleComponentClick(componentName)}
              style={{ cursor: "pointer" }}
            >
              {componentName}
            </h3>
          </div>
        ))}
      </div>
      {currentComponent}
    </>
  );
};

export default TestManager;
