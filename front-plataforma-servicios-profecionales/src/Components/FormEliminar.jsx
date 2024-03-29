import React, { useState } from 'react';
import InputComponent from "../Components/InputComponent";
import Heading2 from "../Components/Heading2";
import Button from "../Components/Button";
import SelectComponent from "../Components/SelectComponent"

export default function FormEliminar({ apiURL, apiUrlSelect, textSelect, tituloForm, textButton, idName }) {
    const [formData, setFormData] = useState({
        id: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (selectedRoleId) => {
        console.log(formData)
        setFormData({
            id: selectedRoleId
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(apiURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.pathname = "/admin-panel"
            } else {
                // La solicitud falló, maneja el error aquí
                const errorData = await response.json();
                if (errorData && errorData.errors) {
                    // Actualizar el estado de los errores para que se muestren en el formulario
                    setErrors(errorData.errors);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Puedes manejar los errores de alguna manera, como mostrando un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full h-3/6 flex justify-evenly items-center flex-col gap-4 p-4 bg-black border border-white '>
            <Heading2 text={tituloForm} />
            <div className='w-full h-max flex flex-col justify-around items-center gap-6'>
                <SelectComponent
                    optionKey={idName}
                    apiUrl={apiUrlSelect}
                    textSelect={textSelect}
                    onChange={handleChange}
                />
            </div>
            <Button text={textButton} />
        </form>
    );
};
