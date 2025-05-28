import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchCard = () => {

  const getProduct = useEcomStore((state)=>state.getProduct)
  const products = useEcomStore((state)=>state.products)
  const getCategory = useEcomStore((state)=>state.getCategory)
  const categories = useEcomStore((state)=>state.categories)
  const actionSearchFilters = useEcomStore((state)=>state.actionSearchFilters)
  
  const [text, setText] = useState('')
  const [categorySelected, setCategorySelected] = useState([])

  const [price, setPrice] = useState([1000,30000])
  const [ok, setOk] = useState(false)

    useEffect(()=>{
        getCategory()
    }, [])

    // step 1 Search by Text
  
//   console.log(text)
  useEffect(()=>{
    const delay = setTimeout(()=>{
        
        if(text){
           actionSearchFilters({ query:text }) 
        }else{
            getProduct()
        }
    }, 300)
    return ()=> clearTimeout(delay)
  }, [text])
    
    // step 2 Search by Category
    const handleCheck = (e) => {
        // console.log(e.target.value)
        const inCheck = e.target.value                  // ค่าเราติ๊ก
        const inState = [...categorySelected]           // [] arr ว่าง
        const findCheck = inState.indexOf(inCheck)      // ถ้าไม่เจอจะ return -1

        if(findCheck === -1){
            inState.push(inCheck)
        }else{
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)
        
        if(inState.length > 0){
            actionSearchFilters({ category: inState})
        }else{
            getProduct()
        }
    }
    // console.log(categorySelected)
    // step 3 Search by Price
    useEffect(()=>{
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)
        setTimeout(()=>{
            setOk(!ok)
        }, 300)
    }

  return (
    <div>
        <h1 className='text-xl font-bold mb-4'>
            ค้าหาสินค้า
        </h1>
        <input
        onChange={(e)=>setText(e.target.value)}
        type="text"
        placeholder='ค้นหาสินค้า......'
        className='border rounded-md w-full mb-4 px-2'
        />
        <hr />
        <div>
            <h1 >หมวดหมูสินค้า</h1>
            <div>
                {
                    categories.map((item, index)=>
                        <div className='flex gap-2'>
                        <input
                        onChange={handleCheck} 
                        value={item.id}
                        type='checkbox' 
                        />
                        <label>{item.name}</label>
                        </div>
                    )
                }
            </div>
        </div>
        {/* Search by Price */}
        <div>
            <h1>ค้นหาราคา</h1>
            <div className='flex justify-between'>
                <span>Min : {price[0]} </span>
                <span>Max : {price[1]} </span>
            </div>
            <div>
                <Slider 
                range
                min={0}
                max={100000}
                defaultValue={[1000,30000]}
                onChange={handlePrice}
                />
            </div>
        </div>
    </div>
  )
}

export default SearchCard