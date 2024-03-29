import Heading2 from "../../Components/Heading2"
import Button from "../../Components/Button"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function DetailProfessionalHiring() {


    const navigate = useNavigate()

    const { user } = useUserContext();

    const { id } = useParams();

    const [professional, setProfessional] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/professionals/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProfessional(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const contractFuction = async () => {
        if (user) {
            await fetch(`http://localhost:3000/hiringApplication/newHiringApplications/${user.id}/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${user.token}`
                },
            })
                .then((response) => {
                    if(response.ok){
                        alert("EXITO AL CONTRATAR")
                    }
                })
                .catch((err) => {
                    alert("A OCURRIDO UN ERROR AL CONTRATAR")
                })
        }else{
            navigate("/login")
        }
    }


    return (
        <>

            <main className="p-8 flex justify-between items-center w-full min-h-[85vh] h-max flex-col">
                <div className=" flex justify-start items-center flex-col gap-4 mt-8">
                    <img src={`http://localhost:3000/${professional?.photo}`} alt="imagen de usuario por default" className="bg-red-500 w-40 h-40 rounded-full" />
                    <Heading2 text={professional?.User?.name} />
                    <Heading2 text={`servicio: ${professional?.JobCategory?.name}`} />
                </div>
                <div className=" flex justify-start items-start flex-col gap-4 mt-8">
                    <Heading2 text={"CERTIFICADO DE PROFESIONAL"} />
                    <img src={`http://localhost:3000/${professional?.certificates}`} alt="imagen de usuario por default" className="bg-red-500 w-full h-40" />
                </div>
                <div className=" flex justify-start items-start flex-col gap-4 mt-8">
                    <Button onClick={contractFuction} text={"CONTRATAR"} />
                </div>
            </main>
        </>
    )
}