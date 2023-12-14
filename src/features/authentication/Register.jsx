import { Link, useNavigate } from "react-router-dom"
import illustration from "../../assets/undraw_window_shopping_re_0kbm.svg"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../configuration/firebase";
import {useDispatch} from "react-redux"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { login } from "../user/userSlice";


export default function Register () {
    const [autoPassword, setAutoPassword] = useState(false);
    const [showHidePass, setShowHidePass] = useState(false);
    console.log(showHidePass)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

        const handleRegisterAccount = () => {
            createUserWithEmailAndPassword(auth, email, password) 
            .then((userAuth) => {
                    dispatch(
                        login({
                            email: userAuth.user.email,
                            uid : userAuth.user.uid,
                            roleUser : role,
                        })
                    )
                   navigate("/login") 
                }).catch((error) => {
                    console.log(error)      
            })
        }
        

    function autoGeneratePass() {    
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';"
    

    let autoGeneratePass = ""
    const maxLength = 10

    for(let i = 0; i< maxLength;i++) {
        const randomIndex = Math.floor(Math.random() * character.length);
        autoGeneratePass += character.charAt(randomIndex) 
    }

    return autoGeneratePass
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-cardLogin">
        <div className="bg-cardColor w-7/12 h-[50rem] xl:h-[35rem] lg:h-[35rem] shadow-lg grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 xl:flex-row justify-center rounded-xl">
            <div className="w-full h-full flex flex-1 justify-center items-center ">
                <img src={illustration} 
                alt="illustration" className="w-9/12 "/>
            </div>
            <div className="w-full h-full flex flex-1 justify-center items-center flex-col gap-5">
                <h1 className="text-2xl font-bold text-blue-700">Hi, Silahkan Mendaftar</h1>
                <span className="flex flex-row gap-1"><p className="font-normal">Sudah punya akun di Tama Shop?</p><Link to="/login" className="font-semibold text-blue-600 underline cursor-pointer">Login</Link></span>
                <div className="input input-bordered flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1 w-8/12 mx-auto">
                        <label htmlFor="Username" className="font-semibold">
                            Email
                        </label>
                        <input className="p-1 w-full border-blue-700 border-2 rounded-lg" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1 w-8/12 mx-auto">
                        <label htmlFor="Username" className="font-semibold">
                            Role
                        </label>
                        <select id="select-role" aria-label="select-role" className="w-full border-blue-700 border-2 rounded-lg p-2 bg-white font-semibold" onClick={(e) => setRole(e.target.value)}>
                            <option value="Select" disabled>Select Role</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-8/12 mx-auto">
                        <label htmlFor="Username" className="font-semibold">
                            Password
                        </label>
                        <div className="relative">
                        <input className="p-1 w-full border-blue-700 border-2 rounded-lg"  type={showHidePass ? "text" : "password"} value={autoPassword ? autoGeneratePass() : password} onChange={(e) => setPassword(e.target.value)}/>
                        
                        <button className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowHidePass(!showHidePass)} >
                        {showHidePass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        </div>
                        <span>
                        <input type="checkbox"onChange={() => setAutoPassword(!autoPassword)}/>
                        <label className="ml-2">Generate Auto Password</label>
                        </span>
                    </div>
                    <div  className="flex flex-col gap-1 w-8/12 mx-auto">
                    {email === "" && password === "" && role === "" ? (<button className="w-full bg-gray-700 disabled rounded-lg p-2 font-semibold text-white" disabled>Daftar</button>): (<button className="w-full bg-blue-700 rounded-lg p-2 font-semibold text-white" onClick={handleRegisterAccount}>Daftar</button>)}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>   
    )
}