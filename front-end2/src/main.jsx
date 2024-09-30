import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ListaPersonas from './pages/personas/ListaPersonas.jsx';
import FormPersona from './pages/personas/FormPersona.jsx';
import FotoPersona from './pages/personas/FotoPersona.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import ListaPeliculas from './pages/peliculas/ListaPeliculas.jsx';
import FormPelicula from './pages/peliculas/FormPelicula.jsx';
import FormReparto from './pages/peliculas/FormReparto.jsx';
import ViewPeliculas from './views/peliculas/ViewPeliculas.jsx';
import FotoPelicula from './pages/peliculas/FotoPelicula.jsx';
import ViewDetail from './views/peliculas/ViewDetail.jsx';

import ViewDetails from './views/personas/ViewDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "adm/personas",
    element: <ListaPersonas />
  },
  {
    path: "adm/personas/create",
    element: <FormPersona />
  },
  {
    path: "adm/personas/:id",
    element: <FormPersona />
  },
  {
    path: 'adm/personas/:id/foto',
    element: <FotoPersona />
  },


  {
    path: "adm/peliculas",
    element: <ListaPeliculas />
  },
  {
    path: "adm/peliculas/create",
    element: <FormPelicula />
  },
  {
    path: "adm/peliculas/:id",
    element: <FormPelicula />
  },
  {
    path: 'adm/peliculas/:id/reparto',
    element: <FormReparto />
  },
  {
    path: 'adm/peliculas/:id/foto',
    element: <FotoPelicula />
  },


  {
    path: 'peliculas',
    element: <ViewPeliculas />
  },
  {
    path: 'peliculas/:id',
    element: <ViewDetail />
  },

  {
    path: 'personas/:id',
    element: <ViewDetails />
  },

  
  {
    path: '*',
    element: <ViewPeliculas />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
