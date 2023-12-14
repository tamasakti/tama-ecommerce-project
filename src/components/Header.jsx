import Cart from "../assets/cart.svg"
import {useSelector} from "react-redux"
import {selectCartTotalItems} from "../features/cart/cartSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLockOpen } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


const Header = ({handleOpenModalCart}) => {
    const items = useSelector(selectCartTotalItems)
    

    return (
        <>
        
            <header className="bg-white p-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex-1">
                        <h1 className="xl:text-3xl lg:text-2xl md:text-xl text-xl font-bold text-blue-700">Tama Shop</h1>
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-3   flex-row text-right">
                        <span className="flex flex-row gap-2 items-center cursor-pointer hover:underline"><Link to="/login" className="text-xl text-blue-700 font-semibold">Login</Link><FontAwesomeIcon icon={faLockOpen} className="text-xl text-blue-700 font-semibold"/> </span>
                        <h1 className="text-xl flex items-center font-bold text-blue-700">| </h1>
                        <button name="btn-cart" type="button" className="relative rounded-full bg-blue-800 p-4 text-gray-100 " onClick={handleOpenModalCart}>
                            {items !== 0 ? (<span className="absolute -top-2 right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">{items}</span>) : ""}
                            
                            <img src={Cart} className="w-6 h-6" alt="icon-cart"/>
                        </button>
                        </div>
                    </div>
                </div>
                
            </header>
        </>
    )
}

export default Header