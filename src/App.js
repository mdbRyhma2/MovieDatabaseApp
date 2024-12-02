
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Search from "./pages/Search";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import Showtimes from "./pages/Showtimes";
import Authentication, { AuthenticationMode } from "./pages/Authentication";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  return (
    <div style={{ paddingTop: "6rem" }}>
      <Navbar />
      <Header />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/search" element={<Search />} />
        <Route path="/group" element={<Group />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/login"
          element={<Authentication authenticationMode={AuthenticationMode.Login} />}
        />
        <Route
          path="/signup"
          element={<Authentication authenticationMode={AuthenticationMode.Register} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
