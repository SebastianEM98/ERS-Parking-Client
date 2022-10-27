import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import projectRoutes from "./config/routes";
import "./App.scss";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {projectRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;