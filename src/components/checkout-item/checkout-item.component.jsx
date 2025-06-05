import { useSelector , useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart , clearItemFromCart , removeItemFromCart } from '../../store/cart/cart.action';
import  {
      CheckoutItemContainer,
      ImageContainer,
      BaseSpan,
      Quantity,
      Arrow,
      Value,
      RemoveButton

} from  './checkout-item.styles'

const CheckoutItem = ({cartItem})=>{
       const {name,imageUrl , price ,quantity} = cartItem;
       const cartItems = useSelector(selectCartItems)
       const dispatch = useDispatch();

        



        const clearItemHandler = ()=> dispatch(clearItemFromCart(cartItems ,cartItem))
       const addItemHandle = ()=> dispatch(addItemToCart(cartItems,cartItem))
         const removeItemHandle =()=>dispatch(removeItemFromCart(cartItems,cartItem))
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