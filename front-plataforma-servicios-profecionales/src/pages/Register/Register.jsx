import React, { useState } from 'react';
import InputComponent from "../../Components/InputComponent";
import Heading2 from "../../Components/Heading2";
import ErrorMessage from "../../Components/ErrorMessage";
import Button from "../../Components/Button";
import { useForm } from "react-hook-form";

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const submit = async (data) => {

        try {
            const response = await fetch("http://localhost:3000/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok){
                window.location.pathname = "/login"
             } 
            // else {
            //     // La solicitud falló, maneja el error aquí
            //     const errorData = await response.json();
            //     if (errorData && errorData.errors) {
            //       // Actualizar el estado de los errores para que se muestren en el formulario
            //       setErrors(errorData.errors);
            //     }
            // }
        } catch (error) {
            console.error('Error:', error);
            // Puedes manejar los errores de alguna manera, como mostrando un mensaje al usuario
        }
    };

    return (
        <main className='flex justify-center items-center p-8 w-full h-screen'>
            <form onSubmit={handleSubmit(submit)} className='w-full shadowForm h-full flex justify-evenly items-center flex-col gap-4 p-4 bg-black border border-white '>
            <Heading2 text="REGISTRATE PARA COMENZAR"/>
            <div className='w-full h-max flex flex-col justify-around items-center gap-6'>
            <InputComponent
                type="text"
                placeholder="Ingresa tu nombre"
                name="name"
                register={register}
            />
            <InputComponent
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                register={register}
            />
            <InputComponent
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                register={register}
            />
            </div>
            <Button text="ENVIAR"/>
        </form>
        </main>
    );
};
