"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/setQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
    product:any
}

export type CartProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: selectedImgType;
    qty:number;
    price: number;
};

export type selectedImgType ={
    color: string;
    colorCode: string;
    image: string;
}

const Horizontal = () =>{
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails:React.FC<ProductDetailsProps> = ({product}) => {

    const [CartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        qty: 1,
        price: product.price,
    });
    console.log(CartProduct);

    const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

    const handleColorSelect = useCallback((value: selectedImgType) => {
        setCartProduct((prev) => {
          return {
            ...prev,
            selectedImg: value,
          };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[CartProduct.selectedImg]);

    const handleQuantityIncrease = useCallback(() => {
        if(CartProduct.qty===99){
            return;
        }
        setCartProduct((prev) => {
          return {
            ...prev,
            quantity:++prev.qty,
          };
        }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[CartProduct]);

    const handleQuantityDecrease = useCallback(() => {
        if(CartProduct.qty===1){
            return;
        }
        setCartProduct((prev) => {
          return {
            ...prev,
            quantity:--prev.qty,
          };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[CartProduct]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={CartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div>
                    <Rating value={productRating} readOnly />
                    <div className="flex items-center gap-2">{product.reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">CATEGORY:</span>{product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span>{product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>{product.inStock?'In stock' : 'Out of stock'}</div>
                <Horizontal/> 
                <SetColor cartProduct={CartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
                <Horizontal/>
                <SetQuantity cartProduct={CartProduct} handleQuantityIncrease={handleQuantityIncrease} handleQuantityDecrease={handleQuantityDecrease}/>
                <Horizontal/>
                <div className="max-w-[300px]">
                    <Button label="ADD TO CART" onclick={()=>{}} />
                </div>

            </div>
        </div>
    );
}
export default ProductDetails;