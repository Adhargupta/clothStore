import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import ProvideContext from './context/ProvideContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ProvideContext>
    <App />
  </ProvideContext>
</BrowserRouter>,
)
