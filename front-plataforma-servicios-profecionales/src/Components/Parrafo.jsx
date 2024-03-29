export default function Parrafo({text, classe}){
    return(
        <p className={`bg-transparent text-xs font-medium ${classe}`}>{text}</p>
    )
}