import { useDispatch, useSelector } from "react-redux"
import { getUser, selectUser,} from "../../redux/profileSlice"
import { useState } from "react";


const EditMedicalInfo = ({closeEdit}) => {

    const currentUser = useSelector(selectUser).medical;
    console.log('userinformation: ',currentUser)
    const [user, setUser] = useState({
        diagnosis: currentUser.diagnosis,
        yearOfDiagnosis: currentUser.yearOfDiagnosis,
        currentMedication: currentUser.currentMedication,
        pastMedication: currentUser.pastMedication,
        primaryPhysician: currentUser.primaryPhysician,
        primaryGastro: currentUser.primaryGastro,
        allergies: currentUser.allergies,
    });

    const dispatch = useDispatch();

    
    const updateInfo = async(userInfo) => {
        try {
            const request = await fetch('http://localhost:3000/user/medical', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...userInfo}),
            });

            if(!request.ok){
                throw new Error('request failed in updateInfo @ EditMedicalInfo.jsx');
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
        <div>Diagnosis</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.diagnosis} onChange={(e)=>setUser(prev => ({...prev, diagnosis: e.target.value}))}/>
        <div>Year of Diagnosis</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.yearOfDiagnosis} onChange={(e)=>setUser(prev => ({...prev, yearOfDiagnosis: e.target.value}))}/>
        <div>Current Medication</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.currentMedication} onChange={(e)=>setUser(prev => ({...prev, currentMedication: e.target.value}))}/>
        <div>Past Medication</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.pastMedication} onChange={(e)=>setUser(prev => ({...prev, pastMedication: e.target.value}))}/>
        <div>Primary Physician</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.primaryPhysician} onChange={(e)=>setUser(prev => ({...prev, primaryPhysician: e.target.value}))}/>
        <div>Primary Gastro</div>
        {/* <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.birthday}</div> */}
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.primaryGastro} onChange={(e)=>setUser(prev => ({...prev, primaryGastro: e.target.value}))}/>
        <div>Allergies</div>
        <input className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center border-blue-100 border" value={user.allergies} onChange={(e)=>setUser(prev => ({...prev, allergies: e.target.value}))}/>
        <div className="flex w-full justify-center items-center mt-4">
            <button className="bg-blue-400 h-10 w-24 text-gray-50 rounded-lg" onClick={()=>updateInfo(user)}>Save</button>
        </div>
    </div>
    )

}
export default EditMedicalInfo;