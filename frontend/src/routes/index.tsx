import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};