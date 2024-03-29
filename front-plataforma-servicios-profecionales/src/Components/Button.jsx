export default function Button({ text, onClick }) {
    return (
        <button type="submit" onClick={onClick} className=" text-black bg-white w-28 h-8 shadowBotton  font-semibold">
            {text}
        </button>
    )
}