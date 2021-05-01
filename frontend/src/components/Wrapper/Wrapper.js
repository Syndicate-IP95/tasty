import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header/Header";
import Menu from "./Menu/Menu";

const Wrapper = (props) => {
  const [menuShow, setMenuShow] = useState(false);
  const location = useLocation();
  console.log(menuShow);

  const isMainMode = location.pathname.includes("main");

  return (
    <>
      <Header 
        isMainMode={isMainMode} 
        setMenuShow={setMenuShow} 
      />
      <Menu 
        menuShow={menuShow}
        setMenuShow={setMenuShow}
      />
      {props.children}
    </>
  );
};

export default Wrapper;
