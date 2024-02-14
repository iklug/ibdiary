
const Day = ({day, month, year}) => {    

    const today = new Date(year, month, day);
    const thisMonth = today.toLocaleString('default', {month: 'short'});

    return (
       <div className="border h-full w-full flex justify-center pt-2 text-sm font-semibold select-none" id={`${year}-${month}-${day}`} onClick={(e)=>console.log(e.target.id)}>
           <div className="hover:text-blue-400 rounded-full text-center h-6">{ day === 1 ? `${thisMonth} ${day}` : `${day}` }</div>
       </div>
            
    )
}

export default Day;

