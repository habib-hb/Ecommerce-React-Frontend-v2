  

import { formatPrice } from "../../../utils/formatPrice";
import { truncateText } from "../../../utils/truncateText";
import { Rating } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

interface ProductCardProps {
    data:any
}
const ProductCard:React.FC<ProductCardProps> = ({data}) => {

    const productRating= data.reviews.reduce((acc:number, item:any)=>{
        return acc + item.rating
    } , 0) / data.reviews.length;

    // Placeholder value
    // const productRating= 775;

    // const router = useRouter();

    return (
    <div 
    onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href = `/product/productId?id=${data.id}`;
        }
      }}
    className="
     col-span-1
     cursor-pointer
     border-[1.2px]
     border-slate-200
     bg-slate-50
     p-2
     rounded-sm
     transition
     hover:scale-105
     text-center
     text-sm
    ">
        <div className="
        flex
        flex-col
        w-full
        items-center
        gap-1
        ">
            <div className="aspect-square w-full relative overflow-hidden">
                <img
                src={data.images[0].image}
                alt={data.name}
                className="w-full h-full object-contain"
                    />
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>
        </div>
        
    </div> );
}
 
export default ProductCard;