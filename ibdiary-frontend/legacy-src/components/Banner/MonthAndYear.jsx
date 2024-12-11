import monthArray from "../../utils/monthArray";

const MonthAndYear = ({month, year}) => {
    


    return (
        <div className=" text-lg w-40 text-gray-400 font-sans tracking-wide">
            {`${monthArray[month]} ${year}`}
        </div>
    )
}

export default MonthAndYear;