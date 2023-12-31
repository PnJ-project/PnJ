import React, { useState } from "react";
import Components from "./Components";
import Csrapi from "./CsrApi";
import Login from "./GoogleLogin";
import Logout from "./Logout";
import Sound from "./Sound";
import TodoSample from "./TodoSample";
import Navbar from "./NavbarTest";
import ReactQuery from "./ReactQuery";

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
    Sound: Sound,
    TodoSample: TodoSample,
    Navbar: Navbar,
    ReactQuery: ReactQuery,
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
