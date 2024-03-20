import { useState } from "react";
import buttonColor from "../../utils/buttonColor";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../Profile/ProfileDropdown";
import ProfileDropdownFull from "../Profile/ProfileDropdownFull";
import { replaceState } from "../../redux/calendarSlice";

const BannerProfile = ({color, showDropdown}) => {
    
const [openDropdown, setOpenDropdown] = useState(false);
const [selected, setSelected] = useState('Personal');
const [viewProfile, setViewProfile] = useState(false);
const [loggedOut, setLoggedOut] = useState(false);
const navigate = useNavigate();


const dispatch = useDispatch();

const currentUser = useSelector(selectUser);

const apiURL = import.meta.env.MODE === 'production' ? 'https://ibdiary.fly.dev' : `http://localhost:3000`; 


const logout = async() => {
    try {
        const request = await fetch(`${apiURL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!request.ok){
            throw new Error('unable to log out i guess');
        }
        const data = await request.json();
        console.log(data);

        setLoggedOut(true);
        dispatch(replaceState());
        sessionStorage.removeItem('user');
        console.log('replaced state?')

    } catch (error) {
        console.error(error);
    }
}

const clickViewProfile = () => {
    setViewProfile(!viewProfile);
    setOpenDropdown(!openDropdown);
    console.log('is this running -- @ bannerprofile')
}

const openAndClose = () => {
    setOpenDropdown(!openDropdown);
    if(viewProfile){
        setViewProfile(false);
        setOpenDropdown(false);
    }
}



if(loggedOut){
    navigate('/login');
}

return (
        <div>    
            <div className={`${buttonColor[color]} text-white font-bold h-9 w-9 ml-4 rounded-full flex flex-row justify-center items-center transition-colors duration-200 px-5 py-5 select-none relative`} id='dropdown' onClick={()=>openAndClose()}>
                {currentUser ? currentUser.personal.preferredName ? currentUser.personal.preferredName[0].toUpperCase() : ':)' : ':)'}
            </div>
            <div className="relative">
                {openDropdown && <ProfileDropdown logout={()=>logout()} openProfile={()=>setViewProfile(!viewProfile)}/>}
                {viewProfile && <ProfileDropdownFull />}
            </div>
        </div>
    )
}

export default BannerProfile;