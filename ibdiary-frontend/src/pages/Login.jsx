import { useState } from "react";
import {useDispatch} from 'react-redux'
import { getUser } from "../redux/profileSlice";
import {Link, useNavigate} from 'react-router-dom';
import repeatEvent from "../utils/repeatEvent";


const Login = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    

    const submitLogin = async() => {
        try {
            const request = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if(!request.ok){
                throw new Error('unable to log in');
            }
    
            const data = await request.json();
            dispatch(getUser(data));
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    }

    if(loggedIn){
        navigate('/');
    }

    return (
        <div className=" h-screen border-4 flex justify-center items-center select-none">
            <div className="h-[375px] w-[300px] flex flex-col gap-3 shadow-2xl shadow-gray-400 rounded-lg p-4 mb-16">
                <div className="mb-6 mt-2">
                    <div className="text-2xl font-bold text-gray-600">Login</div>
                    <div className="flex gap-2">
                        <div className="text-gray-600 text-sm">{`Don't`} have an account?</div><Link to={'/signup'}>
                            <div className="text-sm text-blue-400 hover:underline">Sign up</div>
                        </Link>
                    </div>
                </div>
                <div className="flex-col flex gap-2">
                    <div className="text-sm font-semibold text-gray-600 pl-1">Email</div>
                    <input className="outline-none p-1 border rounded-sm border-gray-200 focus:border-blue-300 w-full" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="flex-col flex gap-2 mt-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold pl-1 text-gray-600">Password</div>
                        <div className="text-blue-400 text-xs hover:underline select-none">Forgot Password?</div>
                    </div>
                    <input className="outline-none p-1 rounded-sm border-gray-200 border focus:border-blue-300 w-full" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="flex justify-center mt-6">
                    <button className="h-12 w-full bg-blue-400 text-gray-50 rounded-md hover:bg-blue-500 transition-colors duration-150" onClick={()=>submitLogin()}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;