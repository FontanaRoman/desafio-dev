import React, { useState } from 'react';
import InputComponent from "../../Components/InputComponent";
import Heading2 from "../../Components/Heading2";
import Button from "../../Components/Button";
import { useUserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../Components/ErrorMessage';

export default function Login() {


    const navigate = useNavigate();

    const { updateUser } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {

        try {
            const response = await fetch("http://localhost:3000/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const { data } = await response.json();
                const userToken = data;

                // Actualizar el contexto de usuario
                updateUser(userToken);

                // Redirigir al usuario a la página principal
                navigate('/profile-user');
            } 
            
        } catch (error) {
            console.error('Error:', error);
            // Puedes manejar los errores de alguna manera, como mostrando un mensaje al usuario
        }
    };

    const validation = {
        email: {required:"El email es necesario"},
        password: {required: "La contraseña es necesaria"},
    };

    return (
        <main className='flex justify-center items-center p-8 w-full h-screen'>
            <form onSubmit={handleSubmit(submit)} className='w-full shadowForm h-full flex justify-evenly items-center flex-col gap-4 p-4 bg-black border border-white'>
                <Heading2 text="INICIA SESIÓN" />
                <div className='w-full h-max flex flex-col justify-around items-center gap-6'>
                    <InputComponent
                        type="text"
                        placeholder="Ingresa tu email"
                        name="email"
                        register={register}
                        validation={validation.email}
                    />
                    <ErrorMessage error={errors.email} />
                    <InputComponent
                        type="password" // Corregido: cambio a 'type="password"'
                        placeholder="Ingresa tu contraseña"
                        register={register}
                        name="password"
                        validation={validation.password}
                    />
                    <ErrorMessage error={errors.password} />
                </div>
                <Button text="Iniciar sesión" />
            </form>
        </main>
    );
};
