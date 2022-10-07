import React from "react";
import { useEffect } from "react";
import Modal from "./Modal";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import { useContext } from "react";

const Home = () => {
  const { getUser, user } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwtoken")) {
      navigate("/login");
    } else {
      getUser();
    }
  }, []);
  return (
    <div>
      <div className="container my-3">
        <h1> Welcome back, {user.name} </h1>
        <Notes />
        <Modal />
      </div>
    </div>
  );
};

export default Home;
