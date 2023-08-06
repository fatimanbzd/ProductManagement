import React, { createContext } from "react";
export const UrlContext = createContext();
const UrlContextProvider = (props) => {
  const Url = "http://localhost:5172";
  return (
    <UrlContext.Provider
      value={{
        Url,
      }}
    >
      {props.children}
    </UrlContext.Provider>
  );
};
export default UrlContextProvider;
