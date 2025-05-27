
import  {
      CheckoutItemContainer,
      ImageContainer,
      BaseSpan,
      Quantity,
      Arrow,
      Value,
      RemoveButton

} from  './checkout-item.styles'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem})=>{
       const {name,imageUrl , price ,quantity} = cartItem;

        const {clearItemFromCart,addItemToCart,removeItemToCart}=useContext(CartContext)
        const clearItemHandler = ()=> clearItemFromCart(cartItem)
       const addItemHandle = ()=> addItemToCart(cartItem)
         const removeItemHandle =()=>removeItemToCart(cartItem)
      return (
        <CheckoutItemContainer>
             <ImageContainer>
                <img src={imageUrl}  alt={`${name}`}/>
             </ImageContainer>

             <BaseSpan>{name}</BaseSpan>
             <Quantity>
                <Arrow onClick={addItemHandle}>
                    &#10094;
                </Arrow>
                <Value>{quantity} </Value> 
                <Arrow onClick={removeItemHandle} >
                &#10095;
                </Arrow>
                </Quantity>
             <BaseSpan>{price}</BaseSpan>
             <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
      ) 


}


export default CheckoutItem