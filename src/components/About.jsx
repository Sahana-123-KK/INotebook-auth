import React from "react";
import "./About.css";
import { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const { user } = useContext(noteContext);

  useEffect(() => {
    if (!localStorage.getItem("jwtoken")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h2 className="my-3">This is About Page</h2>
      <div className="container profile">
        <h4 className="my-3">Name : {user.name} </h4>
        <h4 className="my-3">email: {user.email} </h4>
      </div>
    </div>
  );
};

export default About;
