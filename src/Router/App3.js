import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import styled from "styled-components";

const AppContext = React.createContext({});

const ContextProvider = (props) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  return (
    <AppContext.Provider value={{ selectedUsers, setSelectedUsers }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

const Home = () => {
  const { selectedUsers, setSelectedUsers } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [])

  console.log(selectedUsers);
  const toogleDelete = () => {
    let newUsers;
    newUsers = users.filter(item => !selectedUsers.includes(item.login))
    setUsers(newUsers);
    setSelectedUsers([])
  };

  return (
    <div>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={() => toogleDelete()}>Delete</button>

        {users &&
          users.map((user, index) => {
            return <Card user={user} key={index} />;
          })}
      </div>
    </div>
  );
};

const Card = (props) => {
  const { selectedUsers, setSelectedUsers } = useContext(AppContext);
  const { login, avatar_url } = props.user;

  const isSelected = selectedUsers.includes(login);

  const toggleSelect = () => {
    if(selectedUsers.includes(login)){
      setSelectedUsers(selectedUsers.filter(item => item !== login))
    }else {
      setSelectedUsers([...selectedUsers, login]);
    }
  };

  return (
    <div>
      <CardContainer onClick={() => toggleSelect()}>
        <Login isSelected={isSelected ? "blue" : "black"}>{login}</Login>
        
        <Avatar src={avatar_url} />
      </CardContainer>
    </div>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex: 1;
`;

const Login = styled.div`
  font-size: 2rem;
  color: ${(props) => props.isSelected};
`;

const Avatar = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
`;
