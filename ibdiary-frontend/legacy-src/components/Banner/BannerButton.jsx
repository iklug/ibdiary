import buttonColor from "../../utils/buttonColor";

const BannerButton = ({clickFunction, name}) => {

    return (
        <div className="h-8 w-14 text-gray-400 text-sm border border-gray-200 hover:bg-gray-50 transition-color duration-200 rounded-lg flex justify-center items-center select-none" onClick={clickFunction}>
            {name}
        </div>
    )
}

export default BannerButton;