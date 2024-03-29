import Parrafo from "../../Components/Parrafo"
import Button from "../../Components/Button"
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfileUser(){

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

    return(
        <main className="p-8 flex justify-between items-center w-full min-h-[85vh] h-max flex-col">
            <img src={user?.photo ? `http://localhost:3000/${user?.photo}` : "/user-default.jpg"} alt="imagen de usuario por default" className="w-40 h-40 rounded-full"/>
            <div className="w-full flex justify-start items-start gap-8 flex-col">
                <Parrafo classe={"text-2xl"} text={`Nombre: ${user?.name}`}/>
                <Parrafo classe={"text-2xl"} text={`Email: ${user?.email}`}/>
                <Parrafo classe={"text-2xl"} text={`Rol: ${user?.rol_id}`}/>
            </div>
            <div className="w-full h-max flex gap-8 justify-center item-center">
                <Button onClick={()=>{navigate("/edit-password")}} text={"Editar pass"}/>
                <Button onClick={logoutHandling} text={"Cerrar session"}/>
            </div>
        </main>
    )
} 