import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"

const ProductList = () => {
  const [searchItem, setSearchItem] = useState("")
  const [sort, setSort] = useState("All")
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("All Categories")
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts =  () => {
      setLoading(true);
      axios
      .get("/products")
      .then((response) => {
        const {data} = response
        setProduct(data)
      })
      .catch((err) => {
        console.log(err.message)
      }).finally(() => setLoading(false))

      // try {
      //   const response = await fetch("https://fakestoreapi.com/products");
      //   const data = await response.json();
      //   dispatch(dataProducts(data));
      //   setProduct(data)
      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
  
    let updatedProduct = [...product]

    const filterSearchData = updatedProduct.filter((product) => {
      return product.title.toLowerCase().includes(searchItem.toLowerCase())
    })

    updatedProduct = filterSearchData
    //sort alphabetical
    if(sort === "Paling Murah") {
      updatedProduct.sort((a,b) => a.price - b.price)
    } else if(sort === "Paling Mahal") {
      updatedProduct.sort((a,b) => b.price - a.price)
    } else if (sort === "asc") {
      updatedProduct.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "desc") {
      updatedProduct.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      updatedProduct
    }

    

    //filter by categori

    if(category !== "All Categories") {
      const filterDataProduct = updatedProduct.filter((product) => product.category === category)
      updatedProduct = filterDataProduct
    } else {
      updatedProduct 
    }

    setFilteredData([...updatedProduct])
    
  }, [searchItem, product, sort, category]);

  const handleAddToCart = (product) => {
    dispatch(add(product))
  };


  return (
    <>
        {isLoading ? ("loading...") : (
            <div className="flex flex-col">
              <div className="flex-1">
              <div className="w-full lg:h-[7rem] xl:h-[7rem] h-14rem grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="sort" className="font-semibold">Sorting Products</label>
          <select onClick={(e) => setSort(e.target.value)} className="p-2 bg-slate-200 rounded-lg text-md" aria-label="sort-product">
                  <option value="Select Filter">Sort Product</option>
                  <option value="asc">Ascending (A - Z)</option>
                  <option value="desc">Descending (Z - A)</option>
                  <option value="Paling Mahal">Highest Price</option>
                  <option value="Paling Murah">Lower Price</option>
              </select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
          <label className="font-semibold" htmlFor="select-categories">Select by Categories</label>
              <select onClick={(e) => setCategory(e.target.value)} className="p-2 bg-slate-200 rounded-lg text-md" aria-label="select-categories">
                  <option value="All Categories">Filter Categories</option>
                  <option value="men's clothing" >Mens Clothing</option>
                  <option value="women's clothing">Womens Clothing</option>
                  <option value="electronics">Eletronics</option>
                  <option value="jewelery">Jewelery</option>
              </select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
          <label className="font-semibold ">Search Item</label>
          <input 
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="type to search"
          className="bg-slate-200 p-2 rounded-lg"
          />
              
          </div>
          
      </div>
              </div>
              <div className="flex-1">
            <div className="w-full h-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {filteredData.map((product) => {
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border shadow-xl p-6 gap-4 flex flex-col"
              >
                <div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
                <h1 className="text-center text-lg font-semibold">{product.title}</h1>
                  <div className="w-8/12 h-full mx-auto">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
                    rel="preload"
                  />
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-black py-2 px-4 text-white rounded-md w-10/12 mx-auto hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faCartShopping} />{" "} Add To Cart
                </button>
                <span className="flex w-full mx-auto flex-row justify-between"><p className="text-black font-bold text-xl px-4 py-3">${product.price} | {product.category}</p> <p className="py-3 text-black gap-3 font-semibold text-lg"><FontAwesomeIcon icon={faStar} className="text-black"/> {""} {product.rating.rate}</p></span>
           
              </div>
            )
          })}
          
        </div>
        </div>
        </div>
        )}
    </>
    
  );
};


export default ProductList

