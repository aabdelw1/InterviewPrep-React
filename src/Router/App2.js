import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams
} from "react-router-dom";

import "./styles.css";

const AppContext = React.createContext({});

const ContextProvider = (props) => {
  const [loginInfo, setLoginInfo] = useState("");
  return (
    <AppContext.Provider value={{ loginInfo, setLoginInfo }}>
      {props.children}
    </AppContext.Provider>
  );
};

const Label = styled.text`
  font-size: 1.5rem;
  font-weight: 100;
`;

const Email = styled.input`
  /* width: 3rem; */
`;

const Password = styled.input`
  /* width: 3rem; */
`;

const Submit = styled.button`
  color: blue;
  /* width: 3rem;
  height: 1rem; */
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const validate = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password.length >= 8 &&
      email !== "" &&
      password !== ""
    ) {
      console.log("COORECT");
      setIsInvalid(false);
      return true;
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <Label>Email</Label>
        <Email value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label>Password</Label>
        <Password
          value={password}
          onChange={(e) => setPassowrd(e.target.value)}
        />
      </div>
      <div>
        <Submit onClick={() => validate()}>Submit</Submit>
        {isInvalid && <Label> Incorrect Input</Label>}
      </div>
      <div>
        <Link to={`forgot/${email}`}>Forgot Passord?</Link>
      </div>
    </div>
  );
};

const Forgot = () => {
  let { email } = useParams();
  let [searchParams] = useSearchParams();

  // const mail = searchParams.get("email") || "Could not find email";

  return <div>OOps forgot password!! but here is your email: {email}</div>;
};

export default function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route index path={"/login"} element={<Login />} />
          <Route path={"login/forgot/:email"} element={<Forgot />} />
        {/*<Route path={'/success'} element={<Success/>} /> */}
      </Routes>
    </ContextProvider>
  );
}
