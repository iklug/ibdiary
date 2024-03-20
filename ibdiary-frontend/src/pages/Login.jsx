import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import { getUser } from "../redux/profileSlice";
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
 



const Login = () => {

    const {register,handleSubmit, watch, formState: {errors}, reset} = useForm();

    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            console.log('so i guess this just means nothing to you?')
            navigate('/');
        }
    },[]);

    const apiURL = import.meta.env.MODE === 'production' ? 'https://ibdiary.fly.dev' : `http://localhost:3000`; 

    const onSubmit = async(formData) => {
        try {
            const request = await fetch(`${apiURL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(!request.ok){
                throw new Error('* Incorrect email or password');
            }
            const data = await request.json();
            dispatch(getUser(data));
            sessionStorage.setItem('user', data._id);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            reset();
        }
    }

    if(loggedIn){
        navigate('/');
    }

    return (
        <div className=" h-screen border-4 flex justify-center items-center select-none">
            <div className="h-[375px] w-[300px] flex flex-col gap-3 shadow-2xl shadow-gray-400 rounded-lg p-4 mb-16">
                <div className="mb-4 mt-2 relative">
                    <div className="text-2xl font-bold text-gray-600">Login</div>
                    <div className="flex gap-2 pt-2">
                        <div className="text-gray-600 text-sm">{`Don't`} have an account?</div><Link to={'/signup'}>
                            <div className="text-sm text-blue-400 hover:underline">Sign up</div>
                        </Link>
                    </div>
                    {errorMessage && <p className="text-red-600 absolute top-16">{errorMessage}</p>}
                    </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col flex gap-2 relative pb-2">
                        <div className="text-sm font-semibold text-gray-600 pl-1">Email</div>
                        <input className="outline-none p-1 border rounded-sm border-gray-200 focus:border-blue-300 w-full relative" {...register('email', {required: '* This field is required', pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '* Properly formatted email is required'}}) } />
                        <p className="text-[.7rem] text-red-600 absolute top-16">{errors.email?.message}</p>
                    </div>
                    <div className="flex-col flex gap-2 mt-4 relative pb-4">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-semibold pl-1 text-gray-600">Password</div>
                            <div className="text-blue-400 text-xs hover:underline select-none">Forgot Password?</div>
                        </div>
                        <input type='password' className="outline-none p-1 rounded-sm border-gray-200 border focus:border-blue-300 w-full" {...register('password', {required: '* This field is required', minLength: {value: 4, message: '* Password must be at least 4 characters'}})} />
                        <p className="text-[.7rem] text-red-600 absolute top-16">{errors.password?.message}</p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <input type="submit" className="h-12 w-full bg-blue-400 text-gray-50 rounded-md hover:bg-blue-500 transition-colors duration-150"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;