import React, { useState } from 'react';
import InputComponent from "../../Components/InputComponent";
import Heading2 from "../../Components/Heading2";
import Button from "../../Components/Button";
import SelectComponent from "../../Components/SelectComponent";
import ImageUploader from "../../Components/ImageUploader";
import ErrorMessage from "../../Components/ErrorMessage"; // Importa el componente ErrorMessage para mostrar errores
import { useForm } from "react-hook-form";

export default function RegisterProfessionals() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const validation = {
        file: {required:"Las imagenes son necesarias"},
        name: {required:"El nombre es necesario"},
        email: {required:"El email es necesario"},
        password: {required: "La contraseña es necesaria"},
        categoria: {required: "La categoria es necesaria"}
    };

    const peticion = async (body) => {
        try {
            await fetch("http://localhost:3000/user/registerProfessionals", {
                method: 'POST',
                body: body,
            }).then(async (response) => {
                if (response.ok) {
                    // Muestra un mensaje de éxito o redirige a una página de éxito
                    alert("Registro exitoso!");
                    window.location.pathname = "/login";
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
        newFormData.append("name", data.name);
        newFormData.append("email", data.email);
        newFormData.append("password", data.password);
        newFormData.append("jobCategory_id", data.jobCategory_id);
        let extencion = data.imageProfessionals[0].name.split(".")
        newFormData.append("files", data.imageProfessionals[0],`imageProfessionals.${extencion[extencion.length-1]}`);
        extencion = data.imageDocuments[0].name.split(".")
        newFormData.append("files", data.imageDocuments[0],`imageDocuments.${extencion[extencion.length-1]}`);
        extencion = data.imageCertificate[0].name.split(".")
        newFormData.append("files", data.imageCertificate[0],`imageCertificate.${extencion[extencion.length-1]}`);

        console.log(data.jobCategory_id, "datos")
        peticion(newFormData)

        console.log(newFormData.files)

    }
    
    return (
        <main className='flex justify-center items-center p-8 w-full h-max'>
            <form onSubmit={handleSubmit(submit)} encType="multipart/form-data" className='w-full shadowForm h-full flex justify-evenly items-center flex-col gap-4 p-4 bg-black border border-white'>
                <Heading2 text="REGISTRATE COMO PROFESIONAL" />
                <div className='w-full h-max flex flex-col justify-around items-center gap-6'>
                    <InputComponent
                        type="text"
                        placeholder="Ingresa tu nombre"
                        name="name"
                        register={register}
                        validation={validation.name}
                    />
                    <ErrorMessage error={errors.name} />
                    <InputComponent
                        type="email"
                        placeholder="Ingresa tu email"
                        name="email"
                        register={register}
                        validation={validation.email}
                    />
                    <ErrorMessage error={errors.email} />
                    <InputComponent
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        name="password"
                        register={register}
                        validation={validation.password}
                    />
                    <ErrorMessage error={errors.password} />
                    <ImageUploader register={register} validation={validation.file} name={"imageProfessionals"} text={"Foto del profesional"} />
                    <ErrorMessage error={errors.imageProfessionals} />
                    <ImageUploader register={register} validation={validation.file} name={"imageDocuments"} text={"Foto del documento"} />
                    <ErrorMessage error={errors.imageDocuments} />
                    <ImageUploader register={register} validation={validation.file} name={"imageCertificate"} text={"Certificado de profesional"} />
                    <ErrorMessage error={errors.imageCertificate} />
                    <SelectComponent
                        apiUrl={"http://localhost:3000/jobCategory/getCategory"}
                        optionKey={"jobCategory_id"}
                        textSelect={"CATEGORIAS"}
                        register={register}
                        name="jobCategory_id"
                        validation={validation.categoria}
                    />
                    <ErrorMessage error={errors.jobCategory_id} />
                </div>
                <Button text="ENVIAR" />
            </form>
        </main>
    );
};
