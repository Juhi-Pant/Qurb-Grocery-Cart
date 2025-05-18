import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {CartProvider} from './context/context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <BrowserRouter>
    <CartProvider>
    <App/>
    </CartProvider>
    </BrowserRouter>

  
)
