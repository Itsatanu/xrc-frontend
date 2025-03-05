import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { icon, title } from 'dynamic-web-header';
import webIcon from './asset/web-icon.png'


//route config
import AuthProvider from './auth/AuthProvider'
import Path from './routes/Path';





function App() {
 
  useEffect(() => {
    icon(webIcon)
  })


  return (
    <AuthProvider>
      <Router>
       <Path/>
      </Router>
    </AuthProvider>
  )
}

export default App
