import React, { useContext } from "react";
import "./App.css";
import {
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

const AppContext = React.createContext({});

const ContextProvider = (props) => {
  const [allItems, setAllItems] = React.useState([]);

  return (
    <AppContext.Provider value={{ allItems, setAllItems }}>
      {props.children}
    </AppContext.Provider>
  );
};

const products = [
  {
    name: "nissan",
    price: "10",
    id: 1,
    image: require("../src/static/Automotive.png"),
    colors: ["blue", "orange", "green"],
    doors: ["two", "four"],
  },
  {
    name: "Home",
    price: "100",
    id: 2,
    image: require("../src/static/Home.png"),
    colors: ["blue", "orange", "green"],
    doors: ["two", "four"],
  },
];

function Home() {
  return (
    <div className="App">
      {products.map((item) => {
        return <Card item={item} key={item.id} />;
      })}
    </div>
  );
}

const Card = (props) => {
  const { id, name, price, image } = props.item;
  return (
    <Link to={`product/${name}`}>
      <div key={id}>
        <div>{name}</div>
        <div>{price}</div>
        <img src={image} />
      </div>
    </Link>
  );
};

const Product = () => {
  let { name } = useParams();
  let [searchParams] = useSearchParams();
  const { allItems, setAllItems } = useContext(AppContext);

  const [item] = products.filter((item) => item.name === name);

  const color = searchParams.get("color") || item.colors[0];
  const door = searchParams.get("door") || item.doors[0];

  const toogleAdd = () => {
    const myItem = {
      name: item.name,
      color,
      door,
    };
    setAllItems([...allItems, myItem]);
  };

  return (
    <div>
      <h1>
        {item.name} {item.price}
      </h1>
      <h3>
        {color} {door}
      </h3>
      <h2>Colors</h2>
      {item.colors.map((color) => {
        return <Link to={`?color=${color}&door=${door}`}>{color} </Link>;
      })}
      <h2>Doors</h2>
      {item.doors.map((door) => {
        return <Link to={`?color=${color}&door=${door}`}>{door} </Link>;
      })}
      <button onClick={() => toogleAdd()}>Add To Cart</button>
      <Link to={'/cart'}>Cart</Link>
    </div>
  );
};

const Cart = () => {
  const { allItems } = useContext(AppContext);
  console.log(allItems)
  return (
    <div>
      {allItems &&
        allItems.map((item) => {
          return (
            <div>
              <h1>{item.name}</h1>
              <h2>{item.color}</h2>
              <h3>{item.door}</h3>
            </div>
          );
        })}
    </div>
  );
};
const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product/:name" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
