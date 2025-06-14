import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ContractProvider } from './context/ContractContext'; // your wrapper component
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ContractProvider>
      <App />
    </ContractProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
