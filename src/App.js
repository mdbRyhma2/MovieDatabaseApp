import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Search from "./pages/Search";
import Showtimes from "./pages/Showtimes";
import Movies from "./pages/Movies";
import { AuthProvider } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Header />
      <div style={{ paddingTop: "6rem" }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
