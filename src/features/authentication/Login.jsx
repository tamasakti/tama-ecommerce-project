import { Link, useNavigate } from "react-router-dom"
import illustration from "../../assets/undraw_window_shopping_re_0kbm.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import {useDispatch} from "react-redux"
import { login } from "../user/userSlice"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../configuration/firebase"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginToApp = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {   
            dispatch(
                login({
                    email : userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoUrl : userAuth.user.photoURL
                })
            )
            navigate("/");
            console.log("berhasil Login ")
        })
        .catch((err) => {
            console.log(err.message)
        })
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-cardLogin">
            <div className="bg-cardColor w-7/12 h-[35rem] shadow-lg grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 xl:flex-row justify-center rounded-xl">
                <div className="w-full h-full flex flex-1 justify-center items-center flex-col">
                    <img src={illustration} 
                    alt="illustration" className="w-9/12 "/>
                    <Link to="/" >Go To Website {">>"}</Link>
                </div>
                <div className="w-full h-full flex flex-1 justify-center items-center flex-col gap-5">
                    <h1 className="text-2xl font-bold text-blue-700">Hi, Selamat Datang Kembali</h1>
                    <span className="flex flex-row gap-1"><p className="font-normal">Baru di Tama Shop?</p><Link to="/register" className="font-semibold text-blue-600 underline cursor-pointer">Daftar</Link></span>
                    <div className="input input-bordered flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1 w-8/12 mx-auto">
                            <label htmlFor="Username" className="font-semibold">
                                Email
                            </label>
                            <input 
                            className="w-full p-1 border-blue-700 border-2 rounded-lg" 
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-8/12 mx-auto">
                            <label htmlFor="Username" className="font-semibold">
                                Password
                            </label>
                            <div className="relative">
                            <input 
                            className="w-full p-1 border-blue-700 border-2 rounded-lg" 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faEyeSlash} className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer"/>
                            
                            </div>
                        </div>
                        <div  className="flex flex-col gap-1 w-8/12 mx-auto">
                            <button 
                            className="w-full bg-blue-700 rounded-lg p-2 font-semibold text-white"
                            onClick={loginToApp}
                            >Login
                            </button>
                        </div>
                        <div className="flex-1 flex-col gap-2 mt-4">
                            <h1 className="text-center font-normal text-slate-400">atau masuk menggunakan</h1>
                            <hr className="w-10/12 text-center mx-auto mt-3 text-slate-500 h-2"/>
                            <span className="flex flex-row gap-10 mt-3 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM64 256c0-55.3 44.7-100 100-100c27 0 49.5 9.8 67 26.2l-27.1 26.1c-7.4-7.1-20.3-15.4-39.8-15.4c-34.1 0-61.9 28.2-61.9 63.2c0 34.9 27.8 63.2 61.9 63.2c39.6 0 54.4-28.5 56.8-43.1H164V241.8h94.4c1 5 1.6 10.1 1.6 16.6c0 57.1-38.3 97.6-96 97.6c-55.3 0-100-44.7-100-100zm291 18.2v29H325.8v-29h-29V245h29V216H355v29h29v29.2H355z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login    