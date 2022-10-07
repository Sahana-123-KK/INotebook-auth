import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";

const Signup = () => {
  const { displayAlert } = useContext(noteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtoken")) {
      navigate("/");
    }
  }, []);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        // localStorage.setItem("jwtoken", json.token);
        navigate("/login");
        displayAlert("success", "Account Created successfully");
      } else {
        displayAlert("danger", "Invalid details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <>
      <h2>Sign Up to use iNotebook</h2>
      <form onSubmit={signupSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
