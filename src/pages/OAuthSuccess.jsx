import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile"); // redirect user
    }
  }, []);

  return (
    <div>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default OAuthSuccess;
