import { useState,useContext, createContext ,useEffect} from "react";


const addCartItem =(cartItems,productToAdd) =>{
   // find if cartItem contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === productToAdd.id
    );


   // if found , increase  quantity
   // cai nay la ghi de quatity len cartItem nakk
   if (existingCartItem){
    return  cartItems.map((cartItem)=>cartItem.id === productToAdd.id 
        ?{...cartItem,quantity: cartItem.quantity+1} : cartItem

    )
    }

 
   //return new array with modify cartItems /new cart item
   return [...cartItems, { ...productToAdd, quantity: 1 }];

} 

   const removeCartItem =(cartItems,cartItemToRemove)=> {
     // find the cart item to remove
     const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === cartItemToRemove.id
    );

     // check if quantity is equal to 1, if it is remove that item
      if(existingCartItem.quantity === 1){
         return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id );
      }




     //return back cartitems with matching cart item with the reduced quantity
     
    return cartItems.map((cartItem)=>
    cartItem.id === cartItemToRemove.id
    ? {...cartItem,quantity:cartItem.quantity -1}
        :cartItem
 
    );

   }

   const clearCartItem =(cartItems, cartItemToClear)=> cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id );


   

export const  CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : ()=>{},
    cartItems : [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart:()=>{},
    cartCount: 0,
    cartTotal:0,
    
});

export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);

   // dong moi them nha de dc so lg hien thi cua cart item 
     const [cartCount, setCartCount] = useState(0);
     const [cartTotal, setCartTotal] = useState(0)
     
     
     useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
          );
          setCartCount(newCartCount);
      },[cartItems])



     useEffect(()=>{
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price ,
            0
          );
          setCartTotal(newCartTotal);
      },[cartItems])
   
   const addItemToCart =(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd))

    }

    const removeItemToCart =(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove))

    }


    const clearItemFromCart =(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems,cartItemToClear))

    }

             

 
    const value  ={isCartOpen,
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        clearCartItem,
        cartItems,
        cartCount,
        clearItemFromCart,
        cartTotal,
        
        
    };

    return (
        <CartContext.Provider value={value}>
             {children}
        </CartContext.Provider>
    )
}