import { useState } from "react";

const ConfirmEditRepeatPopup = ({cancelFunction, changeInstance, submit, selected}) => {


    return (
        <div className=" h-screen w-screen bg-gray-700 bg-opacity-60 fixed top-16 left-0 flex justify-center items-center">
            <div className="h-56 w-80 rounded-lg flex flex-col items-start pl-4 justify-start pt-8 gap-4 bg-white shadow-lg text-gray-600 mb-10">
                <div className="text-lg">Edit repeating event</div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                        <div className={`rounded-full h-4 w-4 border-2 ${selected === 'single' ? 'bg-blue-300 border-blue-200' : 'bg-white border-gray-300'}`} value={'single'} onClick={()=>changeInstance('single')}></div>
                        <div>Only this event</div>
                    </div>
                    <div className="flex gap-4 items-center">
                    <div className={`rounded-full h-4 w-4 border-2 ${selected === 'after' ? 'bg-blue-300 border-blue-200' : 'bg-white border-gray-300'}`} onClick={()=>changeInstance('after')}></div>
                        <div>This and following events</div>
                    </div>
                    <div className="flex gap-4 items-center">
                    <div className={`rounded-full h-4 w-4 border-2 ${selected === 'all' ? 'bg-blue-300 border-blue-200' : 'bg-white border-gray-300'}`} onClick={()=>changeInstance('all')}></div>
                        <div>All events</div>
                    </div>
                </div>
            
            <div className="flex justify-end gap-6 w-full pr-6 items-end h-10">
                <div className="text-gray-300 hover:text-gray-400 transition-colors duration-100" onClick={cancelFunction}>Cancel</div>
                <div className="text-blue-300 hover:text-blue-400 transition-colors duration-100" onClick={submit}>OK</div>
            </div>
            </div>
        </div>
    )
}

export default ConfirmEditRepeatPopup;