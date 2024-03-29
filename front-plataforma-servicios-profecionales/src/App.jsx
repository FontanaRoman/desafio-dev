import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Register, Login, RegisterProfessionals, ProfileUser, EditProfileUser, Profesionales, HirringApplication, DetailProfessionalHiring } from './pages'
import Layout from './Components/Layout';
import { UserProvider } from "./Context/UserContext";
import './App.css'

function App() {


  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='professionals'>
              <Route index element={<Profesionales />} />
              <Route path='detail/:id' element={<DetailProfessionalHiring />} />
            </Route>
            <Route path='register-professionals' element={<RegisterProfessionals />} />
            <Route path='profile-user' element={<ProfileUser />} />
            <Route path='edit-password' element={<EditProfileUser />} />
            <Route path='hiring' element={<HirringApplication />} />
            <Route path='error-404' element={<div>error</div>} />
            <Route path='*' element={<Navigate to="error-404" replace />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
