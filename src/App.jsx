import "./App.css";
import Language from "./pages/Language";
import Home from "./pages/Home";
import Service from "./pages/Service";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RequestSuccess from "./pages/RequestSuccess";
import PreviousServices from "./pages/PreviousServices";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rapidm2b.onrender.com/api/repairs`, {
        withCredentials: true, // Needed if backend has credentials: true
      })
      .then((response) => {
        setRepairs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching repairs:", error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Language />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service-request"
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-success"
          element={
            <ProtectedRoute>
              <RequestSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/previous-services"
          element={
            <ProtectedRoute>
              <PreviousServices />
            </ProtectedRoute>
          }
        />

        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
