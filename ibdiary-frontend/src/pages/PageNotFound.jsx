import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            setLoggedIn(true);
        }
    },[]);


    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="h-1/2 w-2/3 flex justify-center items-center flex-col mb-32">
                <div className=" text-[5rem] text-gray-600">404</div>
                <div className="text-xl text-gray-600 mb-6">Oh geez, I got mixed up</div>
                {loggedIn ? <div onClick={()=>navigate('/')} className="p-3 bg-blue-300 hover:bg-blue-500 text-gray-100 rounded-lg">Back to the Cal</div> : <div className="p-3 bg-blue-400 hover:bg-blue-500 text-gray-100 rounded-lg transition-colors duration-150" onClick={()=>navigate('/login')}>Let me log in</div>}
            </div>
        </div>
    )
}

export default PageNotFound;