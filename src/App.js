import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.css'

// ROUTES IMPORT
import GeneroListPage from "./pages/generos/GenerosPage";
import GeneroNewPage from "./pages/generos/NewPage";
import GeneroUpdatePage from "./pages/generos/EditPage";
import PlataformaListPage from "./pages/plataformas/PlataformasPage";
import PlataformaNewPage from "./pages/plataformas/NewPage";
import PlataformaUpdatePage from "./pages/plataformas/EditPage";

import { AppProvider } from "./context/appContext";
import DashboardPage from "./pages/dashboard/DashboardPage";


function App() {
  return (
    <BrowserRouter>
    <AppProvider>
        <Routes>
        
            <Route path={"/"} element={<DashboardPage />} />
            <Route path={"/generos"} element={<GeneroListPage />} />  
            <Route path={"/generos/new"} element={<GeneroNewPage />} />
            <Route path={"/generos/update/:id"} element={<GeneroUpdatePage />} />
            <Route path={"/plataformas"} element={<PlataformaListPage />} />  
            <Route path={"/plataformas/new"} element={<PlataformaNewPage />} />
            <Route path={"/plataformas/update/:id"} element={<PlataformaUpdatePage />} />
        
        </Routes>
    </AppProvider>
    </BrowserRouter>
  );
}

export default App;
