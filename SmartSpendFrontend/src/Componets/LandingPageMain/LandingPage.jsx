import { useState } from "react"
import AuthScreen from "../AuthScreenMain/AuthScreen"

export default function LandingPage(){

    const [isVisible, setIsVisible] = useState(false)


    return(
        <div>
            <h1>home</h1>
            <button  onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 bg-blue-500 text-white rounded"></button>

            {isVisible && (
                <div className="mt-4 p-4 bg-gray-200 rounded">
                    <AuthScreen/>
                </div>
            )}
        </div>
    )
}