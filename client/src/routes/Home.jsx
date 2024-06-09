import { Outlet, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProblemList from "../components/problemlist";
export default function Home() {
  const [problems, setproblems] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3050/home")
      .then((response) => response.json())
      .then((data) => {
        setproblems(data.responseData);
        setLoginStatus(data.loginStatus);
      })
      .catch((error) => console.error("Error fetching problems:", error));
  }, []);
  if (!problems) return <div>Loading..........</div>;
  return (
    <>
      <NavLink to={"/userprofile"}>Profile</NavLink>
      <NavLink to={"/testSignup"}>SignUp</NavLink>
      {/* <ProblemList problems={problems}></ProblemList> */}
    </>
  );
}
