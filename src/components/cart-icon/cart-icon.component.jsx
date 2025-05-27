 
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {ReactComponent as ShoppingIconSvg} from '../../assets/shopping-bag.svg'
import {CartIconContainer,ShoppingIcon,ItemCount} from './cart-icon.styles';

const CartIcon = ()=>{
     const {isCartOpen,setIsCartOpen,cartCount }= useContext(CartContext)
     
     const toggleIsCardOpen = ()=> setIsCartOpen(!isCartOpen)


    return (
        <CartIconContainer onClick={toggleIsCardOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon
