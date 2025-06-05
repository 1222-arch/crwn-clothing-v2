 import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../button/button.component'
import {CartDropdownContainer,
       EmptyMessage,
       CartItems}
        from  './cart-dropdown.styles'

import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../store/cart/cart.selector'


const CartDropDown = ()=>{
 
      // const {cartItems}= useContext(CartContext);
      const cartItems = useSelector(selectCartItems)
      
      const navigate = useNavigate();

      const goToCheckoutHandler =()=>{
        navigate('/checkout')
      }


    return (
        <CartDropdownContainer>
          <CartItems>
            {
                cartItems.length ? ( cartItems.map((item) => (
                    <CartItem  key={item.id} cartItem={item}/>
                  ))) : (

                    <EmptyMessage>your cart is empty</EmptyMessage>
                  )
            }
        
            </CartItems>

          <Button onClick={goToCheckoutHandler}>Go to checkout</Button>

        </CartDropdownContainer>
    )
}

export default CartDropDown