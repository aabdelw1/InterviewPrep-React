import React, { useState, useEffect, useContext } from "react";
import { Routes, Link, Route, useParams } from "react-router-dom";

import "./App.css";

function Home() {
  const [data, setData] = useState(null);

  console.log(data);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="App">
      <div>
        {data &&
          data.map((item) => {
            return <BlogLink item={item} />;
          })}
      </div>
    </div>
  );
}

const BlogLink = (props) => {
  const { id, title } = props.item;
  return <Link to={`blog/${id}`}> <h2>{title} </h2></Link>;
};

const Blog = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setBlog(json));
  }, []);

  console.log(blog)

  return (
    <div>
      <h2>{blog && blog.title}</h2>
      <p> {blog && blog.body}</p>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  );
};

export default App;
