
const BannerLogo = () => {
    return (
        <div className="flex items-center gap-12 mr-2">
                <div className=" h-12 bg-blue-400 px-2 flex items-center rounded-md relative overflow-hidden">
                <div className=" h-32 w-32 bg-blue-500 rounded-full absolute left-8 hover:-translate-x-12 transition-all duration-500"></div>
                    <div className="text-white font-semibold z-10 select-none pointer-events-none">IBDiary</div>
                </div>
            </div>
    )
}

export default BannerLogo;