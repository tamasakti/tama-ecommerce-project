import Cart from "../assets/cart.svg"
import {useSelector} from "react-redux"
import {selectCartTotalItems} from "../features/cart/cartSlice"


const Header = ({handleOpenModalCart}) => {
    const items = useSelector(selectCartTotalItems)
    

    return (
        <>
        
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <h1 className="text-3xl font-bold text-blue-700">Tama Shop</h1>
                        
                        <button type="button" className="relative rounded-full bg-blue-800 p-4 text-gray-100" onClick={handleOpenModalCart}>
                            {items !== 0 ? (<span className="absolute -top-2 right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">{items}</span>) : ""}
                            
                            <img src={Cart} className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
                
            </header>
        </>
    )
}

export default Header