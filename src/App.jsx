import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './features/productlist/ProductList'
import CartModal from './features/cart/CartModal'
import Footer from './components/Footer'

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false)

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true)
  }

  const handleHideModalCart = () => {
    setIsOpenModalCart(false)
  }
  return (
    <>
      {isOpenModalCart ? <CartModal handleHideModalCart={handleHideModalCart}/> : null}
      <Header handleOpenModalCart={handleOpenModalCart}/>
      <main className='max-w-7xl mx-auto px-4'> 
        <ProductList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
