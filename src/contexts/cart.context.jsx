import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, cartItemToAdd) => {

    // find if cartItems contains cartItemToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
    );

    // id found,increment quantity
    if(existingCartItem) {

        return cartItems.map((cartItem) => 
            cartItem.id === cartItemToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem 
        );

    }
    // return new array with modified cartItems/ new car item

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];

};


export const removeCartItem = (cartItems, cartItemToRemove) => {

    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is, then remove that item from the cart
    if(existingCartItem.quantity === 1) {

        return cartItems.filter((cartItem) => 
            cartItem.id !== cartItemToRemove.id 
        );

    };

    // return matching cart item with reduced quantity
    if(existingCartItem) {

        return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem 
        );

    }

};


export const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0 
});

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems]   = useState([]);
    const [cartCount, setCartCount]   = useState(0);
    const [cartTotal, setCartTotal]   = useState(0);

    useEffect(() => {

        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(() => {

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 
            0
        )
        setCartTotal(newCartTotal);

    }, [cartItems]);

    const addItemToCart = (cartItemToAdd) => {
        setCartItems(addCartItem(cartItems, cartItemToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal, 
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};