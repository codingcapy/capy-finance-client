
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: main jsx for capy finance client
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Auth from './components/Auth/Auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth>
    <App />
  </Auth>,
)
