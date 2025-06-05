

import { Fragment  } from "react"
import { Outlet ,Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"

import { selectCurrentUser } from "../../store/user/user.selector"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"
import { ReactComponent as CrownLogo}  from '../../assets/crown.svg'
import { signOutStart } from "../../store/user/user.action"
import { selectIsCartOpen } from "../../store/cart/cart.selector"

import    {NavigationContainer ,NavLinks, NavLink,LogoContainer} from'./navigation.styles'


const Navigation =()=>{
    const dispatch = useDispatch();
    const currentUser =  useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
 
    const signOutUser= ()=> dispatch(signOutStart())

  return ( 
        <Fragment>
          <NavigationContainer>
            <LogoContainer to='/'>

           <CrownLogo className="logo"/>
            </LogoContainer>
          
           <NavLinks>
           <NavLink to='/shop'>
              SHOP
             </NavLink>
             {
              currentUser ? (
                <NavLink as='span'  onClick={signOutUser}>SIGN OUT</NavLink>
              ) : ( <NavLink to='/auth'>
                  SIGN IN 
                  </NavLink>)
              
             }


            <CartIcon/>

           </NavLinks>
           { isCartOpen && <CartDropDown/>}  
         </NavigationContainer>
         <Outlet/>
        </Fragment>
    )
}

export default Navigation

