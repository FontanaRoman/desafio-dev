export default function InputComponent({ type, placeholder, name, register, validation=null,...otherProps }) {
    return (
            <input
                type={type} // Tipo de input (text, number, email, etc.)
                placeholder={placeholder} // Placeholder del input
                id={name}
                name={name}  // Nombre del campo de entrada
                {...(validation ? register(name, validation) : register(name))}
                className=" outline-none border-0 font-medium border-b border-white bg-transparent text-center p-1 placeholder:text-white w-44" // clases que tendra el componenete
                {...otherProps}
            />

    )
}