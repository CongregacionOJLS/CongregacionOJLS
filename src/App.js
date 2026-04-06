import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

// Importación de componentes
import Inicio from './componentes/Inicio';
import SalidasPredicacion from './componentes/SalidasPredicacion';
import Anuncios from './componentes/Anuncios';
import NoVisitar from './componentes/NoVisitar';
import Territorios from './componentes/Territorios';
import VidaYMinisterio from './componentes/VidaYMinisterio';
import Login from './componentes/Login';
import ModoAdmin from './componentes/ModoAdmin';
import Formulario from './componentes/Formulario';
import Carritos from './componentes/Carritos';
import Acomodadores from './componentes/Acomodadores';
import Conferencias from './componentes/Conferencias';

// Importamos nuestro cliente de Supabase
import { supabase } from './credenciales';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // 1. Verificamos la sesión actual al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
    });

    // 2. Nos suscribimos a los cambios de estado (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUsuario(session?.user ?? null);
      }
    );

    // 3. Limpiamos la suscripción si el componente se desmonta
    return () => subscription.unsubscribe();
  }, []); 

  return (
    <Router basename='/CongregacionOJLS'>
      <Routes>
        <Route exact path="/" element={<Inicio usuario={usuario}/>} />
        <Route path="/NoVisitar" element={<NoVisitar usuario={usuario}/>} />
        <Route path="/Anuncios" element={<Anuncios usuario={usuario}/>} />
        <Route path="/Territorios" element={<Territorios usuario={usuario}/>} />
        <Route path="/VidaYMinisterio" element={<VidaYMinisterio usuario={usuario}/>} />
        <Route path="/Carritos" element={<Carritos usuario={usuario}/>} />
        <Route path="/Acomodadores" element={<Acomodadores usuario={usuario}/>} />
        <Route path="/Conferencias" element={<Conferencias usuario={usuario}/>} />
        <Route path="/SalidasPredicacion" element={<SalidasPredicacion usuario={usuario}/>} />
        <Route path="/Login" element={<Login usuario={usuario}/>} />
        <Route path="/Admin" element={<ModoAdmin usuario={usuario}/>} />
        <Route path="/Formulario" element={<Formulario usuario={usuario}/>} />
      </Routes>
    </Router>
  );
}

export default App;