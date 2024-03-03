import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo";
import EditMedicalInfo from "./EditMedicalInfo";
import EditPersonalInfo from "./EditPersonalInfo";


const ProfileDropdownFull = () => {

const [selected, setSelected] = useState('Personal');
const [profileEdit, setProfileEdit] = useState(false);

    return (
        <div className="fixed top-16 right-2 w-[400px] min-h-[300px] max-h-[600px] h-2/3 bg-gray-50 shadow-md shadow-gray-400 rounded-md z-10 flex flex-col items-center pt-2 overflow-scroll">
            <div className="flex items-center w-full justify-end">
                <div className="h-8 w-40 overflow-hidden rounded-full bg-white text-gray-500 text-xs flex justify-center items-center shadow-sm">
                    <div className={`h-10 w-24 flex justify-center items-center text-gray-500 ${selected === 'Personal' ? 'bg-gray-300' : 'bg-white'}`} onClick={()=>setSelected('Personal')}>Personal</div>
                    <div className={`h-10 w-24 flex justify-center items-center ${selected === 'Medical' ? 'bg-gray-300 text-gray-500' : 'bg-white'}`} onClick={()=>setSelected('Medical')}>Medical</div>
                </div>
                <div className="text-gray-500 text-sm p-2 bg-gray-200 rounded-lg ml-16 mr-2 hover:shadow-inner" onClick={()=>setProfileEdit(!profileEdit)}>edit</div>
            </div>
            <div className="w-full">
                {(selected === 'Personal' && !profileEdit) && <PersonalInfo />}
                {(selected === 'Medical' && !profileEdit) && <MedicalInfo />}
                {(selected === 'Personal' && profileEdit) && <EditPersonalInfo closeEdit={()=>setProfileEdit(false)}/>}
                {(selected === 'Medical' && profileEdit) && <EditMedicalInfo closeEdit={()=>setProfileEdit(false)}/>}
            </div>
            
        </div>
)
}

export default ProfileDropdownFull;