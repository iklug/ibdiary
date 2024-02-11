import buttonColor from "../utils/buttonColor";

const Button = ({size, color, round = true, name, handleClick}) => {

    const buttonSize = size === 'small' ? 'px-3 py-1 text-xs' : size === 'medium' ? 'px-4 py-2' : 'px-6 py-2 font-semibold';
    

    return (
        <button className={`text-white ${round ? 'rounded-full' : 'rounded-md'} ${buttonSize} ${buttonColor[color]} select-none`} onClick={handleClick}>
            {name}
            </button>
    )
}

export default Button;