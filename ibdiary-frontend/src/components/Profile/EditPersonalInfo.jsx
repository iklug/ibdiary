import { useSelector, useDispatch } from "react-redux"
import { getUser, selectUser } from "../../redux/profileSlice"
import { useState } from "react";


const EditPersonalInfo = ({closeEdit}) => {

    const currentUser = useSelector(selectUser);

    const [user, setUser] = useState({
        firstName: currentUser.personal.firstName,
        lastName: currentUser.personal.lastName,
        preferredName: currentUser.personal.preferredName,
        gender: currentUser.personal.gender,
        pronouns: currentUser.personal.pronouns,
        birthday: currentUser.personal.birthday,
        }
    );
    
    const dispatch = useDispatch();

    const updateInfo = async(userInfo) => {
        try {
            const request = await fetch('http://localhost:3000/user/personal', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...userInfo}),
            });

            if(!request.ok){
                throw new Error('request failed in updateInfo @ EditPersonalInfo.jsx');
            }
            const data = await request.json();
            dispatch(getUser(data));
            closeEdit();
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <div className="h-full w-full bg-gray-50 text-sm text-gray-500 pl-3 pt-4 flex-col flex gap-1">
        <div>First Name</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.firstName} onChange={(e)=>setUser(prev => ({...prev, firstName: e.target.value}))}/>
        <div>Last Name</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.lastName} onChange={(e)=>setUser(prev => ({...prev, lastName: e.target.value}))}/>
        <div>Preferred Name</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.preferredName} onChange={(e)=>setUser(prev => ({...prev, preferredName: e.target.value}))}/>
        <div>Gender</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.gender} onChange={(e)=>setUser(prev => ({...prev, gender: e.target.value}))}/>
        <div>Preferred Pronouns</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.pronouns} onChange={(e)=>setUser(prev => ({...prev, pronouns: e.target.value}))}/>
        <div>Birthday</div>
        {/* <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.birthday}</div> */}
        <input type='date' value={user.birthday} onChange={(e)=>setUser(prev => ({...prev, birthday:e.target.value}))} className="w-32" />
        <div>Hopes, Dreams, and Goals</div>
        <div className="h-8 w-full bg-gray-50 text-gray-600 pl-2">none</div>
        <div className="flex w-full justify-center items-center mt-4">
            <button className="bg-blue-400 h-10 w-24 text-gray-50 rounded-lg" onClick={()=>updateInfo(user)}>Save</button>
        </div>
    </div>
    )
}

export default EditPersonalInfo;