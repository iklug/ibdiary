
const ReflectionDots = ({openReflection}) => {
    return (
        <div className="text-gray-200 h-5 hover:text-orange-400 flex justify-center items-end" onClick={openReflection}>
            <div className=" text-lg hover:text-orange-400 transition-colors ease-in-out duration-150">...</div>
        </div>
    )
}

export default ReflectionDots;