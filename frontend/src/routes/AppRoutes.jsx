import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import CarbonoAtorForm from "../pages/CarbonoAtorForm";
import CarbonoAtorList from "../pages/CarbonoAtorList";
import { isAuthenticated } from "../auth/auth";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/carbono-ator" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/carbono-ator"
          element={
            <PrivateRoute>
              <CarbonoAtorList />
            </PrivateRoute>
          }
        />

        <Route
          path="/carbono-ator/novo"
          element={
            <PrivateRoute>
              <CarbonoAtorForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/carbono-ator/:id"
          element={
            <PrivateRoute>
              <CarbonoAtorForm />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

    </BrowserRouter>
  );
}
