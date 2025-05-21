
import'./checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem})=>{
       const {name,imageUrl , price ,quantity} = cartItem;

        const {clearItemFromCart,addItemToCart,removeItemToCart}=useContext(CartContext)
        const clearItemHandler = ()=> clearItemFromCart(cartItem)
       const addItemHandle = ()=> addItemToCart(cartItem)
         const removeItemHandle =()=>removeItemToCart(cartItem)
      return (
        <div className='checkout-item-container'>
             <div className='image-container'>
                <img src={imageUrl}  alt={`${name}`}/>
             </div>

             <span className='name'>{name}</span>
             <span className='quantity'>
                <div className='arrow' onClick={addItemHandle}>
                    &#10094;
                </div>
                <span className='value'>{quantity} </span> 
                <div className='arrow' onClick={removeItemHandle} >
                &#10095;
                </div>
                </span>
             <span className='price'>{price}</span>
             <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
      ) 


}


export default CheckoutItem