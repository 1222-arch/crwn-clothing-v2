import { useSelector,useDispatch } from 'react-redux';
import {ReactComponent as ShoppingIconSvg} from '../../assets/shopping-bag.svg'
import {CartIconContainer,ShoppingIcon,ItemCount} from './cart-icon.styles';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
const CartIcon = ()=>{
    //  const {isCartOpen,setIsCartOpen,cartCount }= useContext(CartContext)
     const dispatch= useDispatch();
     const isCartOpen = useSelector(selectIsCartOpen)
      const cartCount  = useSelector(selectCartCount)

     const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isCartOpen))


    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon
