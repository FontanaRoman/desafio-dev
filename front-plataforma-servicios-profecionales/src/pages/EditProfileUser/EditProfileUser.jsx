import React from 'react';
import InputComponent from "../../Components/InputComponent";
import Heading2 from "../../Components/Heading2";
import Button from "../../Components/Button";
import ErrorMessage from "../../Components/ErrorMessage"; // Importa el componente ErrorMessage para mostrar errores
import { useForm } from "react-hook-form";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EditProfile() {

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

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const validation = {
        email: {required: "El email es necesario"},
        name: { required: "El nombre es necesario" },
        password: { required: "La contraseña es necesaria" },
        newPassword: { required: "La nueva contraseña es necesaria" }
    };

    const peticion = async (body) => {
        try {
            await fetch("http://localhost:3000/user/edit", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${user.token}`
                },
                body: body,
            }).then(async (response) => {
                if (response.ok) {
                    // Muestra un mensaje de éxito o redirige a una página de éxito
                    alert("Edicion correcta");
                    navigate("/profile-user");
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        setError("email", {
                            message: errorData.errors.email.msg,
                        })
                        const valueError = Object.keys(errorData.errors)
                        console.log(valueError);
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const submit = (data) => {
        let newFormData = new FormData();
        newFormData.append("email", data.email);
        newFormData.append("password", data.password);
        newFormData.append("newPassword", data.newPassword);

        peticion(JSON.stringify(data))

    }

    return (
        <main className='flex justify-center items-center p-8 w-full h-max'>
            <form onSubmit={handleSubmit(submit)} className='w-full shadowForm h-full flex justify-evenly items-center flex-col gap-4 p-4 bg-black border border-white'>
                <Heading2 text="Cambiar contraseña" />
                <div className='w-full h-max flex flex-col justify-around items-center gap-6'>
                    <InputComponent
                        type="email"
                        placeholder="Ingresa tu email actual"
                        name="email"
                        register={register}
                        validation={validation.email}
                    />
                    <ErrorMessage error={errors.email} />
                    <InputComponent
                        type="password"
                        placeholder="Contraseña actual"
                        name="password"
                        register={register}
                        validation={validation.password}
                    />
                    <ErrorMessage error={errors.password} />
                    <InputComponent
                        type="password"
                        placeholder="Nueva contraseña"
                        name="newPassword"
                        register={register}
                        validation={validation.newPassword}
                    />
                    <ErrorMessage error={errors.newPassword} />
                </div>
                <Button text="CAMBIAR" />
            </form>
        </main>
    );
};
