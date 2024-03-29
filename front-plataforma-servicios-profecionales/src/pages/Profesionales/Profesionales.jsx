import Parrafo from "../../Components/Parrafo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profecionales(){

    const navigate = useNavigate();

    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/professionals');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProfessionals(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    


    return(
        <main className="w-full h-max flex justify-center items-center flex-col gap-4 p-4">
            {professionals.map(professional => (
                <div key={professional?.professionals_id} className="flex justify-between items-center w-full border-white border-t border-b border-r">
                    <img src={professional?.photo ? `http://localhost:3000/${professional?.photo}` : "/user-default.jpg"} alt="imagen-profesional" className="w-24 h-24"/>
                    <div className="flex flex-col justify-start items-center gap-2 p-2">
                        <Parrafo text={`Nombre: ${professional?.User?.name}`}/>
                        <Parrafo text={`Servicio: ${professional?.JobCategory?.name}`} /> {/* Cambiar por el servicio real si está disponible en los datos */}
                        <button onClick={()=>{navigate(`/professionals/detail/${professional?.professionals_id}`)}} className="w-28 h-6 bg-white text-black font-semibold">Detalles</button>
                    </div>
                </div>
            ))}
        </main>
    );
}
