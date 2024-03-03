import { useSelector } from "react-redux"
import { selectUser } from "../../redux/profileSlice"


const PersonalInfo = () => {

    const currentUser = useSelector(selectUser);

    return (
        <div className="h-full w-full bg-gray-50 text-sm text-gray-500 pl-3 pt-4">
        <div>First Name</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.firstName}</div>
        <div>Last Name</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.lastName}</div>
        <div>Preferred Name</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.preferredName}</div>
        <div>Gender</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.gender}</div>
        <div>Preferred Pronouns</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.pronouns}</div>
        <div>Birthday</div>
        <div className="h-8 w-5/6 bg-white rounded-lg text-gray-600 pl-2 flex justify-start items-center">{currentUser.personal.birthday}</div>
        <div>Hopes, Dreams, and Goals</div>
        <div className="h-8 w-full bg-gray-50 text-gray-600 pl-2">none</div>
    </div>
    )
}

export default PersonalInfo;