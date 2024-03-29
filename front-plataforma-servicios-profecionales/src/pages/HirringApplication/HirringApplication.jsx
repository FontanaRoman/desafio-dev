import Heading2 from "../../Components/Heading2"
import Parrafo from "../../Components/Parrafo"
export default function HirringApplication() {
    return(
        <main className="flex justify-center items-center flex-col w-full h-max gap-16">
            <div className="flex flex-col justify-center items-center gap-4">
                <Heading2 text={"SOLICITUDES APROBADAS"}/>
                <div className="p-4 w-full h-24 border border-white flex justify-around items-center flex-col">
                    <Parrafo text={"ELECTRICISTA"}/>
                    <Parrafo text={"Profecional : RICARDO"}/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <Heading2 text={"SOLICITUDES PENDIENTES"}/>
                <div className="p-4 w-full h-24 border border-white flex justify-around items-center flex-col">
                    <Parrafo text={"MECANICO"}/>
                    <Parrafo text={"Profecional : juan"}/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <Heading2 text={"SOLICITUDES RECHAZADAS"}/>
                <div className="p-4 w-full h-24 border border-white flex justify-around items-center flex-col">
                    <Parrafo text={"MEDICO"}/>
                    <Parrafo text={"Profecional : MICAELA"}/>
                </div>
            </div>
        </main>
    )
}