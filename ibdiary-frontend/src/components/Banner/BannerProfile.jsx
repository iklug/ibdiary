import buttonColor from "../../utils/buttonColor";

const BannerProfile = ({color, firstInitial, showDropdown}) => {
    
return (
        <div className={`${buttonColor[color]} text-white font-bold h-9 w-9 ml-4 rounded-full flex flex-row justify-center items-center transition-colors duration-200 px-5 py-5 select-none `}>
            {firstInitial}
        </div>
    )
}

export default BannerProfile;