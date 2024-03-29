import { Link } from "react-router-dom";
import Layout from "../../Components/Layout"
import Parrafo from "../../Components/Parrafo";

export default function Home() {

    const handleChange = (event) => {
        // Aquí puedes manejar el cambio de valor del input
        console.log("Nuevo valor del input:", event.target.value);
    };

    return (
        <>
        {/* <Layout /> */}
        <main className=" w-full h-screen flex p-4 justify-center items-center gap-8 flex-col">
            <Parrafo text={"Bienvenido a ProSkillHub, tu plataforma de confianza para encontrar y contratar a los mejores profecionales. Con una amplia gama de talentos verificados y especializados, te ofrecemos solucionar tus necesitdades laborales. descubre expertos calificados y comienza a colaborar hoy mismo para alcanzar tus objetivos con exito"}/>
            <div className="w-full h-max flex flex-col justify-center items-center gap-4 mt-12">
                <Link to={"/register-professionals"} className="shadowBotton w-52 h-6 bg-white text-black font-bold">OFRECE TUS SERVICIOS</Link>
                <Link to={"/register"} className="shadowBotton w-52 h-6 bg-white text-black font-bold">CONTRATA PROFECIONALES</Link>
            </div>
        </main>
        </>
    )
}