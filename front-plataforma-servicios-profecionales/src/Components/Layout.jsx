import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Button from './Button';
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
 
    const {user, updateUser} = useUserContext();

    const logoutHandling = async (e)=>{
        e.preventDefault();

        localStorage.removeItem('user');

        navigate('/login');

        updateUser(null)

    }

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user])

  return (
        <>
        <header className='w-full h-[15vh] p-8 flex justify-between items-center'>
            <div className='w-12 h-8 flex justify-between items-center flex-col' onClick={toggleMenu}>
                <span className='w-full h-[1px] bg-white'></span>
                <span className='w-full h-[1px] bg-white'></span>
                <span className='w-full h-[1px] bg-white'></span>
            </div>
            <h1 className='text-xl font-semibold'>Pro Skill Hub</h1>
        </header>
        <div className={`w-full absolute z-40 h-[85vh] flex justify-around items-center p-4 flex-col ${menuOpen ? "translate-x-[0%]" : "translate-x-[-100%]"} transition duration-300`}>
            <Link to={"/"}>INICIO</Link>
            <Link to={"/profile-user"}>PERFIL</Link>
            <Link to={"/professionals"}>PROFESIONALES</Link>
            <Link to={"/hiring"}>MIS SOLICITUDES</Link>
            <Button onClick={logoutHandling} text={"Cerrar session"}/>
        </div>
        <Outlet />
        </>
  );
}
