import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import React, { createContext, useCallback, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
type CartContextType = {
  cartTotalQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease:(product:CartProductType)=>void;
  handleCartQuantityDecrease:(product:CartProductType)=>void;
  handleClearCart:()=>void;
};

export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(10);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  const handleAddToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updateCart;
      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("eShopCartItems", JSON.stringify(updateCart));
      return updateCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterdProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filterdProducts);
        toast.success("Product removed from cart");
        localStorage.setItem("eShopCartItems", JSON.stringify(filterdProducts));
        return filterdProducts;
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback((product:CartProductType)=>{
    let updatedCart;
    if(product.qty===99){
      return toast.error("You can't add more than 99 quantity of a product");
    }
    if(cartProducts){
      updatedCart=[...cartProducts];
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if(existingIndex>-1){
        updatedCart[existingIndex].qty=++updatedCart[existingIndex].qty;
      }
      setCartProducts(updatedCart);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    }
  },[cartProducts]);

  const handleCartQuantityDecrease = useCallback((product:CartProductType)=>{
    let updatedCart;
    if(product.qty===1){
      return toast.error("You can't decrease quantity less than 1");
    }
    if(cartProducts){
      updatedCart=[...cartProducts];
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if(existingIndex>-1){
        updatedCart[existingIndex].qty=--updatedCart[existingIndex].qty;
      }
      setCartProducts(updatedCart);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    }
  },[cartProducts]);

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    localStorage.setItem("eShopCartItems",JSON.stringify(null));
  },[cartProducts])

  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
