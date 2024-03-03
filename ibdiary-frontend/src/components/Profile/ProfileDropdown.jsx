import { useState } from "react";

const ProfileDropdown = ({logout, openProfile}) => {


    return (
        <div className="text-gray-500 flex flex-col justify-start absolute top-2 right-1 h-28 w-24 bg-white rounded-md drop-shadow-md overflow-hidden text-sm">
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100" onClick={openProfile}>Profile</div>   
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100">Preferences</div>
            <div className="h-10 flex items-center pl-2 hover:bg-gray-100" onClick={logout}>Logout</div>
        </div>

    )
}

export default ProfileDropdown;