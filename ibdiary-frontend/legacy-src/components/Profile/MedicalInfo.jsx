import { useSelector } from "react-redux"
import { selectUser } from "../../redux/profileSlice"


const MedicalInfo = () => {

    const currentUser = useSelector(selectUser);

    return (
        <div className="h-full w-full bg-gray-50 text-sm text-gray-500 pl-3 pt-4">
            <div>Diagnosis</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.diagnosis}</div>
            <div>Year of Diagnosis</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.yearOfDiagnosis}</div>
            <div>Current Medication</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.currentMedication}</div>
            <div>Past Medication</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.pastMedication}</div>
            <div>Primary Physician</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.primaryPhysician}</div>
            <div>Primary Gastro</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.primaryGastro}</div>
            <div>Allergies</div>
            <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.medical.allergies}</div>
        </div>
    )
}

export default MedicalInfo;